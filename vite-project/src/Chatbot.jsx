
// import React, { useState } from 'react';
// import axios from 'axios';

// const Chatbot = () => {
//   const [domain, setDomain] = useState('customer_support');
//   const [query, setQuery] = useState('');
//   const [responses, setResponses] = useState([]);

//   const handleChat = async () => {
//     try {
//       const response = await axios.post('http://localhost:3001/chat', {
//         domain,
//         query
//       });

//       setResponses([
//         ...responses,
//         { type: 'user', text: query },
//         { type: 'bot', text: response.data.response }
//       ]);
//       setQuery('');
//     } catch (error) {
//       console.error('Chat error:', error);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
//       <h1>HackOHire Chatbot</h1>
//       <select 
//         value={domain} 
//         onChange={(e) => setDomain(e.target.value)}
//         style={{ marginBottom: '10px' }}
//       >
//         <option value="customer_support">Customer Support</option>
//         <option value="technical_support">Technical Support</option>
//       </select>
//       <input 
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Type your message..."
//         style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//       />
//       <button onClick={handleChat} style={{ padding: '10px', width: '100%' }}>
//         Send
//       </button>
//       <div style={{ marginTop: '20px' }}>
//         {responses.map((msg, index) => (
//           <div key={index} style={{ marginBottom: '10px' }}>
//             <strong>{msg.type === 'user' ? 'You' : 'HackOHire'}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Chatbot;





// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import './Chatbot.css'

// const Chatbot = () => {
//   const [domain, setDomain] = useState('customer_support');
//   const [query, setQuery] = useState('');
//   const [responses, setResponses] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [responses]);

//   const handleChat = async () => {
//     if (!query.trim()) return;
//     setIsLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3001/chat', {
//         domain,
//         query,
//       });

//       setResponses(prev => [
//         ...prev,
//         { type: 'user', text: query },
//         { type: 'bot', text: response.data.response },
//       ]);
//       setQuery('');
//     } catch (error) {
//       console.error('Chat error:', error);
//       setResponses(prev => [
//         ...prev,
//         { type: 'user', text: query },
//         { type: 'bot', text: 'Sorry, there was an error processing your request.' },
//       ]);
//     }
//     setIsLoading(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleChat();
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot-header">
//         <span>HackOHire Chatbot</span>
//         <select
//           value={domain}
//           onChange={(e) => setDomain(e.target.value)}
//           className="chatbot-domain-select"
//         >
//           <option value="customer_support">Customer Support</option>
//           <option value="technical_support">Technical Support</option>
//         </select>
//       </div>

//       <div className="chatbot-messages">
//         {responses.map((msg, index) => (
//           <div
//             key={index}
//             className={`chat-message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {isLoading && <div className="typing-indicator">Typing...</div>}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="chatbot-input-container">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Type your message..."
//           className="chatbot-input"
//           disabled={isLoading}
//         />
//         <button
//           onClick={handleChat}
//           className="chatbot-send-button"
//           disabled={isLoading}
//         >
//           {isLoading ? '...' : 'Send'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [domain, setDomain] = useState('customer_support');
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [responses]);

  const handleChat = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/chat', {
        domain,
        query,
      });
      setResponses(prev => [
        ...prev,
        { type: 'user', text: query },
        { type: 'bot', text: response.data.response },
      ]);
      setQuery('');
    } catch (error) {
      console.error('Chat error:', error);
      setResponses(prev => [
        ...prev,
        { type: 'user', text: query },
        { type: 'bot', text: 'Sorry, there was an error processing your request.' },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChat();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Widget */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Expanded Chatbot */}
      {isOpen && (
        <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200">
          <div className="bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba] text-white p-4 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">HackOHelp Chatbot</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="customer_support">Customer Support</option>
              <option value="technical_support">Technical Support</option>
            </select>

            <div className="h-64 overflow-y-auto mb-4 border rounded p-2">
              {responses.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${msg.type === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && <div className="text-center text-gray-500">Typing...</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded-l"
                disabled={isLoading}
              />
              <button
                onClick={handleChat}
                className="bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba] text-white p-2 rounded-r"
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

