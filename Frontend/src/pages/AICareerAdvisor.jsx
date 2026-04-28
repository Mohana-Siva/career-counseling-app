import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const AdvisorStyles = () => (
  <style>{`
    .ai-page-layout {
      display: flex;
      height: 95vh;
      width: 100%;
      background-color: #f0f2f5;
      font-family: 'Inter', sans-serif;
    }

    .chat-history {
      flex: 0 0 280px;
      background-color: #ffffff;
      padding: 20px;
      border-right: 1px solid #d1d5db;
      display: flex;
      flex-direction: column;
    }

    .history-header {
      padding-bottom: 15px;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 15px;
    }

    .history-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #111827;
    }

    .history-list {
      overflow-y: auto;
    }
    
    .history-item-placeholder {
      color: #6b7280;
      font-size: 0.9rem;
      padding: 10px;
      text-align: center;
    }

    .history-item {
      padding: 12px 10px;
      margin-bottom: 8px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      color: #374151;
      transition: background-color 0.2s;
    }

    .history-item:hover {
      background-color: #f3f4f6;
    }

    .ai-advisor-container {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding: 24px;
      background-color: #f9fafb;
    }

    .chat-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 24px;
    }

    .prompt-help {
      margin-bottom: 16px;
      padding: 12px 14px;
      border: 1px solid #bfdbfe;
      background-color: #eff6ff;
      border-radius: 10px;
      color: #1e3a8a;
      font-size: 0.92rem;
      line-height: 1.5;
    }

    .prompt-help strong {
      display: block;
      margin-bottom: 4px;
      color: #1e40af;
    }

    .chat-box {
      flex-grow: 1;
      overflow-y: auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .chat-message {
      padding: 12px 18px;
      border-radius: 18px;
      max-width: 75%;
      line-height: 1.5;
    }

    .bot-msg {
      background-color: #e5e7eb;
      color: #1f2937;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }

    .user-msg {
      background-color: #007bff;
      color: #ffffff;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }

    .typing-indicator {
      display: flex;
      align-items: center;
      padding: 12px 18px;
    }

    .typing-dot {
      width: 8px;
      height: 8px;
      background-color: #9ca3af;
      border-radius: 50%;
      margin: 0 3px;
      animation: typing-bounce 1.2s infinite ease-in-out;
    }

    .typing-dot:nth-child(2) { animation-delay: -1.0s; }
    .typing-dot:nth-child(3) { animation-delay: -0.8s; }

    @keyframes typing-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }

    .chat-input-area {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .chat-input {
      flex-grow: 1;
      border-radius: 10px;
      border: 1px solid #d1d5db;
      padding: 12px;
      resize: none;
    }

    .send-btn {
      border-radius: 10px;
    }
    
    /* Styles for markdown rendering */
    .bot-msg pre {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        font-family: 'Courier New', Courier, monospace;
    }
    .bot-msg code {
        background-color: #f3f4f6;
        color: #c7254e;
        padding: 2px 4px;
        border-radius: 4px;
        font-family: 'Courier New', Courier, monospace;
    }
    .bot-msg pre code {
        background-color: transparent;
        color: inherit;
        padding: 0;
    }
  `}</style>
);


function AICareerAdvisor() {
  const BOT_WELCOME_MESSAGE = {
    sender: "bot",
    text: "Hello! I'm Nala, your AI Career Advisor. Ask me anything about careers in India.",
  };

  const location = useLocation();
  const initialQuizContext = (() => {
    if (location.state?.quizResult) return location.state.quizResult;
    const storedQuiz = localStorage.getItem("latestQuizResult");
    if (!storedQuiz) return null;
    try {
      return JSON.parse(storedQuiz);
    } catch (error) {
      console.error("Failed to parse latest quiz result", error);
      return null;
    }
  })();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([BOT_WELCOME_MESSAGE]);
  const [chatId, setChatId] = useState(null); // ✅ FIXED (now inside component)
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const [quizContext, setQuizContext] = useState(initialQuizContext);

  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    const stateQuiz = location.state?.quizResult;
    if (stateQuiz) {
      setQuizContext(stateQuiz);
    }
  }, [location.state]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/chats/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHistory(res.data);
    } catch (err) {
      console.log("Cannot load chat history", err);
    }
  };

  const loadChat = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE_URL}/api/chats/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setChat(res.data.messages);
      setChatId(id);
    } catch (err) {
      console.log("Failed to load chat", err);
    }
  };

  const startNewChat = () => {
    setChat([BOT_WELCOME_MESSAGE]);
    setChatId(null);
    setMessage("");
  };

const saveChatToDB = async (messages) => {
  try {
    const token = localStorage.getItem("token");

    // Send request: backend decides create/update
    const res = await axios.post(
      `${API_BASE_URL}/api/chats/save`,
      { chatId, messages },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // If new chat, store the ID so future saves update same chat
    if (!chatId) setChatId(res.data._id);

    alert("✅ Chat saved successfully!");
    fetchChatHistory();

  } catch (err) {
    console.error("Chat save failed", err);
    alert("❌ Could not save chat.");
  }
};

const handleSend = async (e) => {
  e.preventDefault();
  if (!message.trim()) return;

  const userMessage = { sender: "user", text: message };
  const updatedChat = [...chat, userMessage];
  setChat(updatedChat);
  setMessage("");
  setIsTyping(true);

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_BASE_URL}/chat-with-groq`,
      {
        chatHistory: updatedChat,
        quizResult: quizContext,
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    const botMessage = { sender: "bot", text: res.data.reply };
    setChat([...updatedChat, botMessage]);

  } catch (error) {
    console.error("AI error:", error);

    setChat([
      ...updatedChat,
      { sender: "bot", text: "⚠️ Error occurred. Try again." },
    ]);
  } finally {
    setIsTyping(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <>
      <AdvisorStyles />
      <div className="ai-page-layout">
        {/* SIDEBAR */}
        <aside className="chat-history">
          <div className="history-header">
            <h3 className="history-title">Past Chats</h3>
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              onClick={startNewChat}
            >
              + New Chat
            </Button>
          </div>

          <div className="history-list">
            {history.length === 0 && (
              <div className="history-item-placeholder">
                Your saved chats will appear here.
              </div>
            )}

            {history.map((item) => (
              <div
                key={item._id}
                className="history-item"
                onClick={() => loadChat(item._id)}
              >
                {item.title}
              </div>
            ))}
          </div>
          <Button
  variant="success"
  className="mt-3"
  onClick={() => saveChatToDB(chat)}
>
  💾 Save Chat
</Button>

        </aside>

        {/* MAIN CHAT */}
        <main className="ai-advisor-container">
          <h2 className="chat-title">AI Career Advisor (Nala)</h2>
          <div className="prompt-help">
            <strong>👋 Hello! I'm Nala, your AI Career Advisor. Ask me anything about careers in India</strong>
            To generate a college choice list, include <code>choice list</code> or <code>cutoff</code>, your cutoff value, and community code (<code>OC</code>, <code>BC</code>, <code>BCM</code>, <code>MBC</code>, <code>SC</code>, <code>SCA</code>, <code>ST</code>).
            Example: <code>Generate my choice list for cutoff 178.5 BC</code>
          </div>

          <div className="chat-box">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${
                  msg.sender === "user" ? "user-msg" : "bot-msg"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}

            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <Form onSubmit={handleSend} className="chat-input-area mt-3">
            <Form.Control
              as="textarea"
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chat-input"
              placeholder="Example: Generate my choice list for cutoff 178.5 BC"
            />
            <Button type="submit" className="send-btn" disabled={isTyping}>
              Send
            </Button>
          </Form>
        </main>
      </div>
    </>
  );
}

export default AICareerAdvisor;

