import { Pinecone } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { NomicEmbeddings } from "@langchain/nomic";
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// --- 1. Initialize Connections ---
const pinecone = new Pinecone({ 
    apiKey: process.env.PINECONE_API_KEY
});
const index = pinecone.Index('career-data');
const namespace = 'career-guidance-docs';

// ✅ CORRECTED: Pass the API key to the constructor
const embeddings = new NomicEmbeddings({ 
    apiKey: process.env.NOMIC_API_KEY, 
    model: "nomic-embed-text-v1.5" 
});

// ... The rest of the file is exactly the same ...

async function loadAndChunkData() {
    console.log("Loading and chunking data...");
    const filePath = path.join(process.cwd(), 'data', 'career-guide.txt');
    const text = await fs.readFile(filePath, 'utf8');
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
    const chunks = await splitter.splitText(text);
    console.log(`Document split into ${chunks.length} chunks.`);
    return chunks;
}

async function embedAndStore(chunks) {
    console.log("Creating embeddings and storing in Pinecone...");
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const vector = await embeddings.embedQuery(chunk);
        await index.namespace(namespace).upsert([{
            id: `doc-chunk-${i}`,
            values: vector,
            metadata: { text: chunk }
        }]);
        console.log(`Upserted chunk ${i + 1}/${chunks.length} into namespace '${namespace}'`);
    }
    console.log("Data ingestion complete!");
}

async function main() {
    const chunks = await loadAndChunkData();
    await embedAndStore(chunks);
}

main().catch(console.error);
