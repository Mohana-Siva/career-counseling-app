import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "../components/styles/AICareerAdvisor.css";

function AICareerAdvisor() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { sender: "bot", text: "👋 Hello! I'm your AI Career Advisor. Ask me anything about career guidance, higher studies, or job opportunities." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([
    { id: 1, title: "Engineering Guidance" },
    { id: 2, title: "Study Abroad Advice" },
    { id: 3, title: "Job vs Higher Studies" }
  ]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message });
      const botMessage = { sender: "bot", text: res.data.reply };
      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveChat = () => {
    const blob = new Blob([JSON.stringify(chat, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `career_chat_${Date.now()}.json`;
    link.click();
  };

  return (
    <div className="ai-page-layout">
      {/* Sidebar */}
      <aside className="chat-history">
        <div className="history-header">
          <h3 className="history-title">💬 Past Chats</h3>
          <Button className="save-btn" onClick={handleSaveChat}>
            Save Chat
          </Button>
        </div>
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              {item.title}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="ai-advisor-container">
        <h2 className="chat-title">AI Career Advisor</h2>

        <div className="chat-box">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
            >
              {msg.text}
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
            className="chat-input"
            placeholder="Type your message..."
          />
          <Button type="submit" className="send-btn">
            Send
          </Button>
        </Form>
      </main>
    </div>
  );
}

export default AICareerAdvisor;