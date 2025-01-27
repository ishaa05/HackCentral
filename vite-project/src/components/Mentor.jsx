// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import {
//   Send,
//   Users,
//   MessageCircle,
//   Video,
//   Clock,
//   Calendar,
//   FileText,
//   HelpCircle,
// } from "lucide-react";

// const LiveForum = () => {
//   return (
//     <div className="min-h-screen bg-blue-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
//           Mentor Support & Q&A Forum
//         </h1>
//         <div className="grid lg:grid-cols-3 gap-20">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-10">
//             <ChatRoom />
//             <ScheduledMeetings />
//             <PDFQuestionAnswer />
//           </div>

//           {/* Right Column */}
//           <div className="space-y-10">
//             <FAQs />
//             <AdditionalInfoCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Additional Info Card Component
// const AdditionalInfoCard = () => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
//       <div className="bg-blue-900 p-4">
//         <h2 className="text-2xl font-semibold text-white text-center">
//           Mentor Mentee Connect
//         </h2>
//       </div>
//       <div className="p-6">
//         <p className="text-blue-700 mb-4">
//           Get appropriate time slot for mentor mentee connect
//         </p>
//         <a
//           href="http://localhost:8501/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block bg-blue-800 text-white py-3 px-6 text-center rounded-xl hover:bg-blue-700 transition duration-300"
//         >
//           Get Timeslot
//         </a>
//       </div>
//     </div>
//   );
// };

// const FAQs = () => {
//   const faqs = [
//     {
//       question: "How do I schedule a session?",
//       answer:
//         "Navigate to the schedule section and select an available time slot.",
//     },
//     {
//       question: "What topics can I discuss?",
//       answer:
//         "We cover a wide range of professional topics including career development, technical skills, and industry insights.",
//     },
//     {
//       question: "Session interruption policy?",
//       answer:
//         "While you can leave a session, we recommend communicating with your mentor beforehand.",
//     },
//     {
//       question: "Are sessions confidential?",
//       answer:
//         "Yes, all sessions are private and not recorded without explicit consent.",
//     },
//     {
//       question: "Mentor communication methods?",
//       answer: "Use our live chatroom or schedule a dedicated meeting.",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
//       <div className="bg-blue-900 p-4">
//         <h2 className="text-2xl font-semibold text-white text-center flex items-center justify-center">
//           <HelpCircle className="mr-3" /> Frequently Asked Questions
//         </h2>
//       </div>
//       <div className="p-6">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             className="mb-4 pb-4 border-b border-blue-100 last:border-b-0 hover:bg-blue-50 transition duration-300 rounded-lg p-3"
//           >
//             <p className="font-semibold text-blue-800 mb-2">{faq.question}</p>
//             <p className="text-blue-600 text-sm">{faq.answer}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const PDFQuestionAnswer = () => {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
//       <div className="bg-blue-900 p-4">
//         <h2 className="text-2xl font-semibold text-white text-center flex items-center justify-center">
//           <FileText className="mr-3" /> PDF Document Q&A
//         </h2>
//       </div>
//       <div className="p-6">
//         <iframe
//           src="http://localhost:8502"
//           width="100%"
//           height="600px"
//           className="border border-blue-200 rounded-xl"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// const ScheduledMeetings = () => {
//   const [meetings, setMeetings] = useState([
//     {
//       id: 1,
//       mentor: "John Smith",
//       topic: "Advanced React Development",
//       date: "2024-02-15",
//       time: "14:30",
//       meetLink: "https://meet.google.com/def-nvfy-exc",
//     },
//     {
//       id: 2,
//       mentor: "Emily Chen",
//       topic: "Strategic Tech Career Growth",
//       date: "2024-02-20",
//       time: "16:00",
//       meetLink: "https://meet.google.com/abc-xyz-123",
//     },
//   ]);

//   const joinMeeting = (meetLink) => {
//     window.location.href = meetLink;
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
//       <div className="bg-blue-900 p-4">
//         <h2 className="text-2xl font-semibold text-white text-center flex items-center justify-center">
//           <Calendar className="mr-3" /> Upcoming Meetings
//         </h2>
//       </div>
//       <div className="p-6 space-y-4">
//         {meetings.map((meeting) => (
//           <div
//             key={meeting.id}
//             className="bg-blue-50 p-4 rounded-xl flex items-center justify-between hover:bg-blue-100 transition duration-300 border border-blue-100"
//           >
//             <div>
//               <div className="flex items-center mb-2">
//                 <Clock className="mr-2 text-blue-700" size={20} />
//                 <span className="font-semibold text-blue-800">
//                   {meeting.mentor}
//                 </span>
//               </div>
//               <p className="text-blue-700 text-sm">{meeting.topic}</p>
//               <p className="text-blue-600 text-xs mt-1">
//                 {meeting.date} at {meeting.time}
//               </p>
//             </div>
//             <button
//               onClick={() => joinMeeting(meeting.meetLink)}
//               className="bg-blue-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-300 flex items-center"
//             >
//               <Video className="mr-2" /> Join Meeting
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ChatRoom = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [username, setUsername] = useState("");
//   const [isJoined, setIsJoined] = useState(false);

//   const socket = io("http://localhost:5000");

//   useEffect(() => {
//     socket.on("message", (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, []);

//   const joinChat = (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       setIsJoined(true);
//     }
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       const msgData = { username, message };
//       socket.emit("message", msgData);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
//       <div className="bg-blue-900 p-4">
//         <h2 className="text-2xl font-semibold text-white text-center flex items-center justify-center">
//           <Users className="mr-3" /> Professional Chat Room
//         </h2>
//       </div>
//       <div className="p-6">
//         {!isJoined ? (
//           <form onSubmit={joinChat} className="space-y-4">
//             <input
//               type="text"
//               className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
//               placeholder="Enter your professional username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-800 text-white py-3 rounded-xl hover:bg-blue-700 transition duration-300"
//             >
//               Join Chat
//             </button>
//           </form>
//         ) : (
//           <div className="flex flex-col h-[600px]">
//             <div className="flex-grow overflow-y-auto border border-blue-100 rounded-xl p-4 mb-4 space-y-3">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className="bg-blue-50 p-3 rounded-lg border border-blue-100"
//                 >
//                   <strong className="text-blue-800 mr-2">{msg.username}:</strong>
//                   <span className="text-blue-700">{msg.message}</span>
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={sendMessage} className="flex space-x-2">
//               <input
//                 type="text"
//                 className="flex-grow px-4 py-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
//                 placeholder="Type a professional message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300"
//               >
//                 <Send />
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LiveForum;








// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import {
//   Send,
//   Users,
//   MessageCircle,
//   Video,
//   Clock,
//   Calendar,
//   FileText,
//   HelpCircle,
//   ChevronDown,
// } from "lucide-react";

// const LiveForum = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#e6e9f0] to-[#eef1f5] p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-16 drop-shadow-lg">
//           Mentor Support & Q&A Forum
//         </h1>
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-10">
//             <ChatRoom />
//             <ScheduledMeetings />
//             <PDFQuestionAnswer />
//           </div>

//           {/* Right Column */}
//           <div className="space-y-10">
//             <FAQs />
//             <AdditionalInfoCard />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AdditionalInfoCard = () => {
//   return (
//     <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform transition-all hover:scale-105">
//       <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
//         <h2 className="text-3xl font-bold text-white text-center">
//           Mentor Mentee Connect
//         </h2>
//       </div>
//       <div className="p-8 text-center">
//         <p className="text-blue-800 mb-6 text-lg font-medium">
//           Find the perfect time slot for your mentor connection
//         </p>
//         <a
//           href="http://localhost:8501/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full text-lg font-semibold hover:scale-110 transition-transform duration-300 shadow-xl hover:shadow-2xl"
//         >
//           Get Timeslot
//         </a>
//       </div>
//     </div>
//   );
// };

// const FAQs = () => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const faqs = [
//     {
//       question: "How do I schedule a session?",
//       answer: "Navigate to the schedule section and select an available time slot.",
//     },
//     {
//       question: "What topics can I discuss?",
//       answer: "We cover professional topics including career development, technical skills, and industry insights.",
//     },
//     {
//       question: "Session interruption policy?",
//       answer: "While you can leave a session, we recommend communicating with your mentor beforehand.",
//     },
//     {
//       question: "Are sessions confidential?",
//       answer: "Yes, all sessions are private and not recorded without explicit consent.",
//     },
//     {
//       question: "Mentor communication methods?",
//       answer: "Use our live chatroom or schedule a dedicated meeting.",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
//         <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
//           <HelpCircle className="mr-4" /> Frequently Asked Questions
//         </h2>
//       </div>
//       <div className="p-8">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             className="mb-4 border-b border-blue-100 last:border-b-0"
//           >
//             <button 
//               onClick={() => setActiveIndex(activeIndex === index ? null : index)}
//               className="w-full flex justify-between items-center py-4 hover:bg-blue-50 transition duration-300 rounded-lg"
//             >
//               <span className="text-left font-semibold text-blue-800">{faq.question}</span>
//               <ChevronDown 
//                 className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} 
//               />
//             </button>
//             {activeIndex === index && (
//               <p className="text-blue-600 text-sm pb-4 animate-fade-in">{faq.answer}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const PDFQuestionAnswer = () => {
//   return (
//     <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform transition-all hover:scale-[1.02]">
//       <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
//         <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
//           <FileText className="mr-4" /> PDF Document Q&A
//         </h2>
//       </div>
//       <div className="p-8">
//         <iframe
//           src="http://localhost:8502"
//           width="100%"
//           height="600px"
//           className="border-4 border-blue-200 rounded-2xl shadow-xl"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// const ScheduledMeetings = () => {
//   const [meetings, setMeetings] = useState([
//     {
//       id: 1,
//       mentor: "John Smith",
//       topic: "Advanced React Development",
//       date: "2024-02-15",
//       time: "14:30",
//       meetLink: "https://meet.google.com/def-nvfy-exc",
//     },
//     {
//       id: 2,
//       mentor: "Emily Chen",
//       topic: "Strategic Tech Career Growth",
//       date: "2024-02-20",
//       time: "16:00",
//       meetLink: "https://meet.google.com/abc-xyz-123",
//     },
//   ]);

//   const joinMeeting = (meetLink) => {
//     window.open(meetLink, '_blank');
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
//         <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
//           <Calendar className="mr-4" /> Upcoming Meetings
//         </h2>
//       </div>
//       <div className="p-8 space-y-6">
//         {meetings.map((meeting) => (
//           <div
//             key={meeting.id}
//             className="bg-blue-50 p-6 rounded-2xl flex items-center justify-between hover:bg-blue-100 transition duration-300 border-2 border-blue-200 shadow-md"
//           >
//             <div>
//               <div className="flex items-center mb-3">
//                 <Clock className="mr-3 text-blue-700" size={24} />
//                 <span className="text-xl font-bold text-blue-900">
//                   {meeting.mentor}
//                 </span>
//               </div>
//               <p className="text-blue-800 text-base font-medium">{meeting.topic}</p>
//               <p className="text-blue-700 text-sm mt-2">
//                 {meeting.date} at {meeting.time}
//               </p>
//             </div>
//             <button
//               onClick={() => joinMeeting(meeting.meetLink)}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:scale-110 transition-transform duration-300 flex items-center shadow-xl"
//             >
//               <Video className="mr-2" /> Join Meeting
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ChatRoom = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [username, setUsername] = useState("");
//   const [isJoined, setIsJoined] = useState(false);

//   const socket = io("http://localhost:5000");

//   useEffect(() => {
//     socket.on("message", (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, []);

//   const joinChat = (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       setIsJoined(true);
//     }
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       const msgData = { username, message };
//       socket.emit("message", msgData);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
//         <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
//           <Users className="mr-4" /> Professional Chat Room
//         </h2>
//       </div>
//       <div className="p-8">
//         {!isJoined ? (
//           <form onSubmit={joinChat} className="space-y-6">
//             <input
//               type="text"
//               className="w-full px-6 py-4 border-2 border-blue-200 rounded-full focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none text-lg"
//               placeholder="Enter your professional username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-xl"
//             >
//               Join Chat
//             </button>
//           </form>
//         ) : (
//           <div className="flex flex-col h-[600px]">
//             <div className="flex-grow overflow-y-auto border-2 border-blue-100 rounded-2xl p-6 mb-6 space-y-4 bg-blue-50">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 rounded-xl shadow-md border border-blue-100"
//                 >
//                   <strong className="text-blue-800 mr-3 text-base">{msg.username}:</strong>
//                   <span className="text-blue-700">{msg.message}</span>
//                 </div>
//               ))}
//             </div>
//             <form onSubmit={sendMessage} className="flex space-x-4">
//               <input
//                 type="text"
//                 className="flex-grow px-6 py-4 border-2 border-blue-200 rounded-full focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none text-lg"
//                 placeholder="Type a professional message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:scale-110 transition-transform duration-300 shadow-xl"
//               >
//                 <Send />
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LiveForum;



import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import dayjs from 'dayjs';
import {
  Send,
  Users,
  Video,
  Clock,
  Calendar,
  FileText,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const LiveForum = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b0b8d4] to-[#eef1f5] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-16 drop-shadow-lg">
          Mentor Support & Q&A Forum
        </h1>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            <ChatRoom />
            <ScheduledMeetings />
            <PDFQuestionAnswer />
          </div>

          {/* Right Column */}
          <div className="space-y-10">
            <FAQs />
            
          </div>
        </div>
      </div>
    </div>
  );
};



const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "How do I schedule a session?",
      answer: "Navigate to the schedule section and select an available time slot.",
    },
    {
      question: "What topics can I discuss?",
      answer: "We cover professional topics including career development, technical skills, and industry insights.",
    },
    {
      question: "Session interruption policy?",
      answer: "While you can leave a session, we recommend communicating with your mentor beforehand.",
    },
    {
      question: "Are sessions confidential?",
      answer: "Yes, all sessions are private and not recorded without explicit consent.",
    },
    {
      question: "Mentor communication methods?",
      answer: "Use our live chatroom or schedule a dedicated meeting.",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
        <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
          <HelpCircle className="mr-4" /> Frequently Asked Questions
        </h2>
      </div>
      <div className="p-8 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border-b border-blue-100 last:border-b-0"
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full flex justify-between items-center py-4 px-6 hover:bg-blue-50 transition duration-300 rounded-lg"
            >
              <span className="text-left font-semibold text-blue-800">{faq.question}</span>
              <ChevronDown 
                className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} 
              />
            </button>
            {activeIndex === index && (
              <p className="text-blue-600 text-sm pb-4 animate-fade-in">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PDFQuestionAnswer = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
        <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
          <FileText className="mr-4" /> PDF Document Q&A
        </h2>
      </div>
      <div className="p-8">
        <iframe
          src="http://localhost:8502"
          width="100%"
          height="600px"
          className="border-4 border-blue-200 rounded-2xl shadow-xl"
        ></iframe>
      </div>
    </div>
  );
};

// const ScheduledMeetings = () => {
//   const [meetings, setMeetings] = useState([

//     {
//       mentor: "Rashi",
//       date: "2024-01-25",
//       time: "14:15",
//       meetLink: "https://meet.google.com/abc-xyz-123",
//     },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);


//   const joinMeeting = (meetLink) => {
//     window.open(meetLink, '_blank');
//   };

//   useEffect(() => {
//     // Simulate fetching data
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
//         <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
//           <Calendar className="mr-4" /> Upcoming Meetings
//         </h2>
//       </div>
//       <div className="p-8 space-y-6">
//         {isLoading ? (
//           <div className="flex justify-center items-center">
//             <div className="animate-spin border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 border-t-transparent"></div>
//           </div>
//         ) : (
//           meetings.map((meeting) => (
//             <div
//               key={meeting.id}
//               className="bg-blue-50 p-6 rounded-2xl flex items-center justify-between hover:bg-blue-100 transition duration-300 border-2 border-blue-200 shadow-md"
//             >
//               <div>
//                 <div className="flex items-center mb-3">
//                   <Clock className="mr-3 text-blue-700" size={24} />
//                   <span className="text-xl font-bold text-blue-900">
//                     {meeting.mentor}
//                   </span>
//                 </div>
//                 <p className="text-blue-800 text-base font-medium">{meeting.topic}</p>
//                 <p className="text-blue-700 text-sm mt-2">
//                   {meeting.date} at {meeting.time}
//                 </p>
//               </div>
//               <button
//                 onClick={() => joinMeeting(meeting.meetLink)}
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:scale-110 transition-transform duration-300 flex items-center shadow-xl"
//               >
//                 <Video className="mr-2" /> Join Meeting
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

const ScheduledMeetings = () => {
  const [teamName, setTeamName] = useState('');
  const [mentorData, setMentorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMentor = async () => {
    if (!teamName.trim()) {
      setError('Please enter a team name.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/team/mentor', {
        params: { teamName },
      });
      setMentorData(response.data.mentor);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setMentorData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const joinMeeting = (meetLink) => {
    window.open(meetLink, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-6">
        <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
          <Calendar className="mr-4" /> Upcoming Meetings
        </h2>
      </div>
      <div className="p-8 space-y-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={fetchMentor}
            className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-full hover:scale-105 transition-transform duration-300 flex items-center shadow-xl"
          >
            Fetch Mentor
          </button>
        </div>
        {error && <p className="text-red-500 font-medium">{error}</p>}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 border-t-transparent"></div>
          </div>
        ) : mentorData ? (
          <div
            className="bg-blue-50 p-6 rounded-2xl flex items-center justify-between hover:bg-blue-100 transition duration-300 border-2 border-blue-200 shadow-md"
          >
            <div>
              <div className="flex items-center mb-3">
                <Clock className="mr-3 text-blue-700" size={24} />
                <span className="text-xl font-bold text-blue-900">
                  {mentorData.name}
                </span>
              </div>
              <p className="text-blue-700 text-sm mt-2">
                {dayjs(mentorData.Date).format('YYYY-MM-DD')} at{' '}
                {dayjs(mentorData.Date).format('HH:mm')}
              </p>
            </div>
            <button
              onClick={() =>
                joinMeeting(mentorData.meetLink || 'https://meet.google.com/abc-xyz-123')
              }
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:scale-110 transition-transform duration-300 flex items-center shadow-xl"
            >
              <Video className="mr-2" /> Join Meeting
            </button>
          </div>
        ) : (
          <p className="text-gray-500 font-medium text-center">
            No mentor data available. Please fetch the mentor details.
          </p>
        )}
      </div>
    </div>
  );
};




const ChatRoom = () => {
  const [messages, setMessages] = useState([]); // Stores all messages
  const [message, setMessage] = useState(""); // Current message input
  const [username, setUsername] = useState(""); // User's name
  const [roomID, setRoomID] = useState(""); // Chat room ID
  const [isJoined, setIsJoined] = useState(false); // Whether user has joined
  const [socket, setSocket] = useState(null); // Socket instance

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.close(); // Clean up socket connection on component unmount
    };
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    if (socket && isJoined) {
      socket.on("message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]); // Add to messages
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket, isJoined]);

  // Handle joining the chat
  const joinChat = (e) => {
    e.preventDefault();
    if (username.trim() && roomID.trim() && socket) {
      socket.emit("joinRoom", roomID); // Notify server about joining
      setIsJoined(true);
    }
  };

  // Handle sending a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const msgData = { username, message, roomID }; // Message data
      socket.emit("message", msgData); // Emit message to server
  
      // Clear input field only
      setMessage(""); 
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6">
        <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
          <Users className="mr-4" /> Professional Chat Room
        </h2>
      </div>
      <div className="p-8">
        {!isJoined ? (
          <form onSubmit={joinChat} className="space-y-6">
            <input
              type="text"
              className="w-full px-6 py-4 border-2 border-blue-200 rounded-full focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none text-lg"
              placeholder="Enter your professional username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-6 py-4 border-2 border-blue-200 rounded-full focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none text-lg"
              placeholder="Enter Room ID"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Join Chat
            </button>
          </form>
        ) : (
          <div className="flex flex-col h-[600px]">
            <div className="flex-grow overflow-y-auto border-2 border-blue-100 rounded-2xl p-6 mb-6 space-y-4 bg-blue-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md border border-blue-100"
                >
                  <strong className="text-blue-800 mr-3 text-base">{msg.username}:</strong>
                  <span className="text-blue-700">{msg.message}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex space-x-4">
              <input
                type="text"
                className="flex-grow px-6 py-4 border-2 border-blue-200 rounded-full focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none text-lg"
                placeholder="Type a professional message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-8 py-4 rounded-full hover:scale-110 transition-transform duration-300 shadow-xl"
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
