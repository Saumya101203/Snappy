import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import './Chatbot.css';

// Define predefined responses
const predefinedResponses = {
  "features": "Here are some features of our app: 1. Real-time messaging 2. User profiles 3. Avatar customization. Feel free to ask if you need more details!",
  "error": "If you encounter errors, please check the following: 1. Ensure you have a stable internet connection. 2. Check for updates. 3. Restart the app if the issue persists.",
  "issue": "If you encounter issues, try the following: 1. Ensure you have a stable internet connection. 2. Check for updates. 3. Restart the app if necessary.",
  "use": "To use the app, simply log in/Create new Account, select a contact, and start chatting. You can also customize your profile and set an avatar.",
  "login": "For login issues, please check if your username and password are correct. If the problem persists, try resetting your password.",
  "contact": "To contact support, please send us an email at sp.singh.302101@gmail.com.",
  "default": "Hi there! I'm here to assist you with the features of this app and common issues. If you have any questions or need help, feel free to ask!"
};

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      message: "Hi! I am your AI assistant, here to help with anything you need. How can I assist you today?",
      sentTime: "just now",
      sender: "Chatbot",
      direction: 'incoming' // Initial message from Chatbot
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Cohere API Key
  const COHERE_API_KEY = 'CcXjY2oBhjqiWnxPrUe5nKTMByJysMYLkSMNPrek';

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    // Set the typing indicator
    setIsTyping(true);

    // Fetch response from predefined responses or Cohere API
    const responseMessage = await getChatbotResponse(message);

    setMessages([...newMessages, {
      message: responseMessage,
      direction: 'incoming',
      sender: "Chatbot"
    }]);

    setIsTyping(false);
  };

  // Function to fetch response from Cohere API or use predefined responses
  async function getChatbotResponse(userMessage) {
    // Check if message contains any of the predefined keywords
    const lowercasedMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowercasedMessage.includes(keyword)) {
        return response;
      }
    }

    // If no predefined response is found, get response from Cohere API
    return getCohereApiResponse(userMessage);
  }

  // Function to fetch response from Cohere API
  async function getCohereApiResponse(userMessage) {
    try {
      const response = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
          model: "command-xlarge-nightly", // Adjust based on available models
          prompt: userMessage,
          max_tokens: 150,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${COHERE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Cohere API response:", response.data); // Log full response
      return response.data.generations[0].text.trim(); // Adjust based on actual response format
    } catch (error) {
      console.error("Error fetching response from Cohere API:", error.response ? error.response.data : error.message);
      return "Sorry, I'm having trouble responding right now. Please try again later.";
    }
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "500px", width: "350px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Chatbot is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;
