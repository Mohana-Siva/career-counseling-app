import { Pinecone } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { NomicEmbeddings } from '@langchain/nomic';
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { PDFParse } from 'pdf-parse';

dotenv.config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const INDEX_NAME = 'career-guide-data';
const index = pinecone.Index(INDEX_NAME);
const namespace = 'career-guidance-docs';

const embeddings = new NomicEmbeddings({
  apiKey: process.env.NOMIC_API_KEY,
  model: 'nomic-embed-text-v1.5',
  taskType: 'search_document',
  task_type: 'search_document'
});

const PDF_FILES = [
  'guide2.pdf',
  'guide3.pdf'
];

function createChunkId(sourceFile, chunkIndex) {
  const sourceKey = sourceFile
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${sourceKey}-chunk-${chunkIndex}`;
}

async function ensureIndexExists() {
  try {
    await pinecone.describeIndex(INDEX_NAME);
    console.log(`Pinecone index '${INDEX_NAME}' already exists.`);
    return;
  } catch (error) {
    const notFound =
      error?.name === 'PineconeNotFoundError' ||
      String(error?.message || '').includes('HTTP status 404');

    if (!notFound) {
      throw error;
    }
  }

  console.log(`Pinecone index '${INDEX_NAME}' not found. Creating it now...`);

  await pinecone.createIndex({
    name: INDEX_NAME,
    dimension: 768,
    metric: 'cosine',
    spec: {
      serverless: {
        cloud: 'aws',
        region: process.env.PINECONE_REGION || 'us-east-1'
      }
    }
  });

  // Wait until index is ready before attempting upserts.
  while (true) {
    const details = await pinecone.describeIndex(INDEX_NAME);
    if (details?.status?.ready) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log(`Pinecone index '${INDEX_NAME}' created and ready.`);
}

async function loadAndChunkPdfs() {
  console.log('Loading and chunking PDF data...');

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50
  });

  const allChunks = [];

  for (const fileName of PDF_FILES) {
    const filePath = path.join(process.cwd(),'data', fileName);
    const fileBuffer = await fs.readFile(filePath);
    const parser = new PDFParse({ data: fileBuffer });
    const parsed = await parser.getText();
    await parser.destroy();
    const chunks = await splitter.splitText(parsed.text || '');

    for (let i = 0; i < chunks.length; i++) {
      allChunks.push({
        id: createChunkId(fileName, i),
        text: chunks[i],
        metadata: {
          source: fileName,
          source_path: path.join('data', fileName),
          mime_type: 'application/pdf',
          total_pages: parsed.total || null,
          chunk_index: i,
          total_chunks_in_source: chunks.length
        }
      });
    }

    console.log(`Processed ${fileName}: ${chunks.length} chunks.`);
  }

  console.log(`Total chunks prepared: ${allChunks.length}`);
  return allChunks;
}

async function embedAndStore(chunksWithMetadata) {
  console.log('Creating embeddings and storing in Pinecone...');

  for (let i = 0; i < chunksWithMetadata.length; i++) {
    const chunk = chunksWithMetadata[i];
    const vector = await embeddings.embedQuery(chunk.text);

    if (!Array.isArray(vector) || vector.length !== 768) {
      throw new Error(
        `Expected 768-d embedding, got ${Array.isArray(vector) ? vector.length : 'invalid'} for chunk ID ${chunk.id}`
      );
    }

    await index.namespace(namespace).upsert([
      {
        id: chunk.id,
        values: vector,
        metadata: {
          ...chunk.metadata,
          text: chunk.text
        }
      }
    ]);

    console.log(`Upserted chunk ${i + 1}/${chunksWithMetadata.length} into namespace '${namespace}'`);
  }

  console.log('Data ingestion complete!');
}

async function main() {
  await ensureIndexExists();
  const chunks = await loadAndChunkPdfs();

  if (!chunks.length) {
    throw new Error('No chunks were generated from the PDF files.');
  }

  await embedAndStore(chunks);
}

main().catch(console.error);
