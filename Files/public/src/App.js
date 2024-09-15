import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatbot from './components/Chatbot';  // Import the chatbot component
import './App.css';  // Import the global styles

export default function App() {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>

      {/* Chatbot toggle button */}
      <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
        {isChatbotVisible ? 'Close Chatbot' : 'Chat with us!'}
      </button>

      {/* Conditionally render the chatbot */}
      {isChatbotVisible && (
        <div className="chatbot-container">
          <Chatbot />
        </div>
      )}
    </div>
  );
}
