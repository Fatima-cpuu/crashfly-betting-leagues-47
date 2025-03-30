
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

const LiveChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      content: "Welcome to live chat support! How can we help you today?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        sender: "agent",
        content: "Thank you for your message. An agent will be with you shortly. In the meantime, you might find your answer in our FAQ section.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Live Chat Support</h1>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col h-[70vh]">
          <div className="bg-gray-700 p-4">
            <div className="flex items-center">
              <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
              <span>Support Agent (Online)</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-aviator-red text-white' 
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {message.sender === 'agent' && (
                    <div className="flex items-center mb-1">
                      <Avatar className="w-5 h-5 mr-2" />
                      <span className="text-xs font-medium">Support Agent</span>
                    </div>
                  )}
                  <p>{message.content}</p>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-4 flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-gray-700 border-gray-600"
            />
            <Button type="submit" className="ml-2 bg-aviator-red hover:bg-aviator-red/80">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
