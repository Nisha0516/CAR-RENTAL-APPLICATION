// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Initial bot message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hi there! I'm your car recommendation assistant. I can help you find the perfect vehicle based on your needs. What type of trip are you planning?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      generateBotResponse(inputMessage);
    }, 1000);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    let botResponse = '';

    // Simple response logic - you can expand this with more sophisticated AI
    if (lowerMessage.includes('trip') || lowerMessage.includes('travel')) {
      botResponse = "Great! Let's find you the perfect car. How many people will be traveling?";
    } 
    else if (lowerMessage.includes('1') || lowerMessage.includes('alone') || lowerMessage.includes('solo')) {
      botResponse = "For solo trips, I recommend an economical car like a Honda Civic or Toyota Corolla. Would you prefer something more luxurious?";
    }
    else if (lowerMessage.includes('2') || lowerMessage.includes('couple')) {
      botResponse = "Perfect for a couple! A comfortable sedan like a Toyota Camry or Hyundai Elantra would be great. Are you planning any special activities?";
    }
    else if (lowerMessage.includes('3') || lowerMessage.includes('4') || lowerMessage.includes('family')) {
      botResponse = "For family trips, an SUV like a Honda CR-V or Toyota RAV4 would provide plenty of space and comfort. What's your budget range?";
    }
    else if (lowerMessage.includes('5') || lowerMessage.includes('more')) {
      botResponse = "For larger groups, I recommend a minivan like a Honda Odyssey or a large SUV like a Ford Explorer. What type of terrain will you be driving on?";
    }
    else if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('economy')) {
      botResponse = "For budget-friendly options, consider: Toyota Corolla ($35/day), Hyundai Elantra ($38/day), or Kia Forte ($36/day). Would you like to see more options?";
    }
    else if (lowerMessage.includes('luxury') || lowerMessage.includes('premium')) {
      botResponse = "For luxury experiences, we have: BMW 5 Series ($109/day), Mercedes E-Class ($115/day), or Audi A6 ($105/day). Any specific features you're looking for?";
    }
    else if (lowerMessage.includes('suv') || lowerMessage.includes('off-road')) {
      botResponse = "Great choice for adventure! Options include: Toyota RAV4 ($75/day), Honda CR-V ($72/day), or Ford Explorer ($85/day). Need 4WD specifically?";
    }
    else if (lowerMessage.includes('electric') || lowerMessage.includes('ev')) {
      botResponse = "Eco-friendly options: Tesla Model 3 ($89/day), Nissan Leaf ($65/day), or Hyundai Kona Electric ($71/day). How important is charging range for you?";
    }
    else if (lowerMessage.includes('book') || lowerMessage.includes('reserve')) {
      botResponse = "I can help you with that! Would you like me to show you available vehicles based on our conversation, or would you prefer to browse all options?";
    }
    else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      botResponse = "You're welcome! Is there anything else I can help you with today?";
    }
    else {
      botResponse = "I'm here to help you find the perfect car! You can tell me about your trip needs, number of passengers, budget, or preferred vehicle type.";
    }

    const botMessage = {
      text: botResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Button */}
      {!isOpen && (
        <button 
          className="chatbot-toggle-btn"
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-robot"></i>
          <span>AI Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Car Recommendation Assistant</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {message.sender === 'bot' && (
                  <div className="bot-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
            />
            <button onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;