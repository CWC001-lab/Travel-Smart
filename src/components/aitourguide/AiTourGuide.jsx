import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './AiTourGuide.css';

const AiTourGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
    setShowGreeting(false);
  };

  const sendMessage = async (userMessage) => {
    // Add user message to the chat
    setMessages([...messages, { text: userMessage, sender: 'user' }]);

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      // Add AI response to the chat
      setMessages([...messages, { text: userMessage, sender: 'user' }, { text, sender: 'ai' }]);
    } catch (error) {
      console.error("Error generating AI response:", error);
    }
  };

  return (
    <div className="ai-tour-guide">
      {showGreeting && !isOpen && (
        <div className="greeting-bubble">Hi, how can I help you?</div>
      )}
      <button className="toggle-button" onClick={toggleChatbox}>
        <img src="/path/to/ai-icon.png" alt="AI Tour Guide" />
      </button>
      {isOpen && (
        <div className="chatbox-modal">
          <div className="chatbox-header">
            <h3>AI Tour Guide</h3>
            <button onClick={toggleChatbox}>Close</button>
          </div>
          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(e.target.value);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AiTourGuide;
