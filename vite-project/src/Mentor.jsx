import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Send, Users, MessageCircle, Video, Clock, Calendar, FileText } from 'lucide-react';
import axios from "axios";

const LiveForum = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-red-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-navy-600 to-red-500 mb-10">
          Mentor Support & Q&A Forum
        </h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ChatRoom />
            <ScheduledMeetings />
            <PDFQuestionAnswer />
          </div>
          <div>
            <FAQs />
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQs = () => {
  const faqs = [
    { question: "How do I schedule a session?", answer: "Go to the schedule section and book a time slot." },
    { question: "What topics can I ask about?", answer: "Feel free to ask about coding, career guidance, and more!" },
    { question: "Can I leave a session mid-way?", answer: "Yes, but it's better to inform your mentor beforehand." },
    { question: "Are sessions recorded?", answer: "No, sessions are private and not recorded unless explicitly stated." },
    { question: "How do I contact a mentor?", answer: "You can use the live chatroom or schedule a session." },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-navy-600 to-red-500 p-4">
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center">
          <MessageCircle className="mr-3" /> FAQs
        </h2>
      </div>
      <div className="p-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="mb-4 pb-4 border-b border-navy-100 last:border-b-0"
          >
            <p className="font-semibold text-navy-700 mb-2">{faq.question}</p>
            <p className="text-gray-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PDFQuestionAnswer = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-navy-600 to-red-500 p-4">
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center">
          <FileText className="mr-3" /> PDF Q&A
        </h2>
      </div>
      <div className="p-6">
        <iframe 
          src="http://localhost:8502" 
          width="100%" 
          height="600px" 
          className="border border-navy-100 rounded-xl"
        >
        </iframe>
      </div>
    </div>
  );
};

const ScheduledMeetings = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      mentor: "John Smith",
      date: "2024-02-15",
      time: "14:30",
      meetLink: "https://meet.google.com/def-nvfy-exc"
    },
    {
      id: 2,
      mentor: "Emily Chen",
      date: "2024-02-20",
      time: "16:00",
      meetLink: "https://meet.google.com/abc-xyz-123"
    }
  ]);

  const joinMeeting = (meetLink) => {
    window.location.href = meetLink;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-navy-600 to-red-500 p-4">
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center">
          <Calendar className="mr-3" /> Scheduled Meetings
        </h2>
      </div>
      <div className="p-6 space-y-4">
        {meetings.map((meeting) => (
          <div 
            key={meeting.id} 
            className="bg-blue-50 p-4 rounded-xl flex items-center justify-between hover:bg-blue-100 transition"
          >
            <div>
              <div className="flex items-center mb-2">
                <Clock className="mr-2 text-navy-600" size={20} />
                <span className="font-semibold text-navy-700">{meeting.mentor}</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                {meeting.date} at {meeting.time}
              </p>
            </div>
            <button
              onClick={() => joinMeeting(meeting.meetLink)}
              className="bg-gradient-to-r from-navy-600 to-red-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition flex items-center"
            >
              <Video className="mr-2" /> Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};







const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const joinChat = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = { username, message };
      socket.emit("message", msgData);
      setMessage("");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-navy-600 to-red-500 p-4">
        <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center">
          <Users className="mr-3" /> Chat Room
        </h2>
      </div>
      <div className="p-6">
        {!isJoined ? (
          <form onSubmit={joinChat} className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-3 border border-navy-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-navy-600 to-red-500 text-white py-3 rounded-xl hover:opacity-90 transition"
            >
              Join Chat
            </button>
          </form>
        ) : (
          <div className="flex flex-col h-[600px]">
            <div className="flex-grow overflow-y-auto border border-navy-100 rounded-xl p-4 mb-4 space-y-3">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className="bg-blue-50 p-3 rounded-lg"
                >
                  <strong className="text-navy-700 mr-2">{msg.username}:</strong>
                  <span className="text-gray-700">{msg.message}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                className="flex-grow px-4 py-3 border border-navy-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-navy-600 to-red-500 text-white p-3 rounded-xl hover:opacity-90 transition"
              >
                <Send />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveForum;