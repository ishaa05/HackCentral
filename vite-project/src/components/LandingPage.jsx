// import { useState, useEffect } from "react";
// import { Calendar, Trophy, Users, Clock, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import NavBar from "./Navbar";
// import About from "./About";
// import axios from "axios";

// const LandingPage = () => {
//   const [upcoming, setUpcoming] = useState([]);
//   const [past, setPast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchHacks = async () => {
//       try {
//         const upcomingRes = await axios.get("http://localhost:3000/api/hackathons/upcoming");
//         const pastRes = await axios.get("http://localhost:3000/api/hackathons/past");
//         setUpcoming(upcomingRes.data || []);
//         setPast(pastRes.data || []);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch hackathon data.");
//         setLoading(false);
//       }
//     };
//     fetchHacks();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.5, duration: 0.8 } },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//   };

//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 1 } },
//   };

//   const handleEventClick = (hackTitle) => {
//     navigate(`/event?hackname=${encodeURIComponent(hackTitle)}`); // Navigate to the event page with the title
//   };

//   if (loading) return <div className="flex items-center justify-center text-[#bbd0ff]">Loading...</div>;
//   if (error) return <div className="flex items-center justify-center text-red-400">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#ffd6ff] via-white to-[#e7c6ff] text-[#333333] relative">
//       <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba]" />
//       <NavBar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <motion.div className="text-center mb-16" variants={fadeInVariants}>
//           <h1
//             className="text-6xl font-extrabold text-[#03045e] drop-shadow-lg transform transition-transform duration-300 hover:scale-105"
//             style={{
//               textShadow: "2px 2px 0 rgba(255, 105, 180, 0.7), 4px 4px 0 rgba(255, 105, 180, 0.5)",
//             }}
//           >
//             Build. Compete. Innovate.
//           </h1>
//           <p className="text-[#333333] text-xl font-semibold max-w-2xl mx-auto">
//             Join virtual hackathons and showcase your skills.
//           </p>
//         </motion.div>
//         <motion.div className="mb-16" variants={containerVariants}>
//           <h2 className="text-4xl font-bold text-[#333333] mb-8 flex items-center">
//             <Calendar className="mr-2 text-[#ff6a88]" /> Upcoming
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {upcoming.map((hack) => (
//               <motion.div
//                 key={hack.title}
//                 onClick={() => handleEventClick(hack.title)} // Add click handler
//                 className="cursor-pointer bg-gradient-to-br from-[#e7c6ff] to-[#c8b6ff] rounded-2xl p-8 border border-[#c8b6ff] shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-2xl font-bold text-[#333333]">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba] text-[#2c3e50] px-4 py-2 rounded-full text-sm shadow-lg">
//                     {hack.status}
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-[#333333]">
//                   <p className="flex items-center">
//                     <Clock className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Trophy className="w-5 h-5 mr-2 text-[#ff6a88]" /> Prize: {hack.prize}
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.difficulty}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {hack.skills?.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-gradient-to-r from-black to-[#purple-800] text-[#ffffff] px-4 py-2 rounded-full text-sm border border-[#purple-700]"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//         <motion.div className="mb-16" variants={containerVariants}>
//           <h2 className="text-4xl font-bold text-[#333333] mb-8 flex items-center">
//             <Trophy className="mr-2 text-[#ff6a88]" /> Past
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {past.map((hack) => (
//               <motion.div
//                 key={hack.title}
//                 className="bg-gradient-to-br from-[#b8c0ff] to-[#bbd0ff] rounded-2xl p-8 border border-[#bbd0ff] shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-2xl font-bold text-[#333333]">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-[#bbd0ff] to-[#bbd0ff] text-[#ffffff] px-4 py-2 rounded-full text-sm shadow-lg">
//                     Completed
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-[#333333]">
//                   <p className="flex items-center">
//                     <Clock className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.difficulty}
//                   </p>
//                   <p>
//                     <strong>Winners:</strong> {hack.winners.join(", ")}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//       <About />
//     </div>
//   );
// };

// export default LandingPage;



// import { useState, useEffect } from "react";
// import { Calendar, Trophy, Users, Clock, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import NavBar from "./Navbar";
// import About from "./About";
// import axios from "axios";
// import Chatbot from "../Chatbot"; // Import the Chatbot component

// const LandingPage = () => {
//   const [upcoming, setUpcoming] = useState([]);
//   const [past, setPast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchHacks = async () => {
//       try {
//         const upcomingRes = await axios.get("http://localhost:3000/api/hackathons/upcoming");
//         const pastRes = await axios.get("http://localhost:3000/api/hackathons/past");
//         setUpcoming(upcomingRes.data || []);
//         setPast(pastRes.data || []);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch hackathon data.");
//         setLoading(false);
//       }
//     };
//     fetchHacks();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.5, duration: 0.8 } },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//   };

//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 1 } },
//   };

//   const handleEventClick = (hackTitle) => {
//     navigate(`/event?hackname=${encodeURIComponent(hackTitle)}`); // Navigate to the event page with the title
//   };

//   if (loading) return <div className="flex items-center justify-center text-[#bbd0ff]">Loading...</div>;
//   if (error) return <div className="flex items-center justify-center text-red-400">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#ffd6ff] via-white to-[#e7c6ff] text-[#333333] relative">
//       <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba]" />
//       <NavBar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <motion.div className="text-center mb-16" variants={fadeInVariants}>
//           <h1
//             className="text-6xl font-extrabold text-[#03045e] drop-shadow-lg transform transition-transform duration-300 hover:scale-105"
//             style={{
//               textShadow: "2px 2px 0 rgba(255, 105, 180, 0.7), 4px 4px 0 rgba(255, 105, 180, 0.5)",
//             }}
//           >
//             Build. Compete. Innovate.
//           </h1>
//           <p className="text-[#333333] text-xl font-semibold max-w-2xl mx-auto">
//             Join virtual hackathons and showcase your skills.
//           </p>
//         </motion.div>
//         <motion.div className="mb-16" variants={containerVariants}>
//           <h2 className="text-4xl font-bold text-[#333333] mb-8 flex items-center">
//             <Calendar className="mr-2 text-[#ff6a88]" /> Upcoming
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {upcoming.map((hack) => (
//               <motion.div
//                 key={hack.title}
//                 onClick={() => handleEventClick(hack.title)} // Add click handler
//                 className="cursor-pointer bg-gradient-to-br from-[#e7c6ff] to-[#c8b6ff] rounded-2xl p-8 border border-[#c8b6ff] shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-2xl font-bold text-[#333333]">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba] text-[#2c3e50] px-4 py-2 rounded-full text-sm shadow-lg">
//                     {hack.status}
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-[#333333]">
//                   <p className="flex items-center">
//                     <Clock className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Trophy className="w-5 h-5 mr-2 text-[#ff6a88]" /> Prize: {hack.prize}
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.difficulty}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {hack.skills?.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-gradient-to-r from-black to-[#purple-800] text-[#ffffff] px-4 py-2 rounded-full text-sm border border-[#purple-700]"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//         <motion.div className="mb-16" variants={containerVariants}>
//           <h2 className="text-4xl font-bold text-[#333333] mb-8 flex items-center">
//             <Trophy className="mr-2 text-[#ff6a88]" /> Past
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {past.map((hack) => (
//               <motion.div
//                 key={hack.title}
//                 className="bg-gradient-to-br from-[#b8c0ff] to-[#bbd0ff] rounded-2xl p-8 border border-[#bbd0ff] shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-2xl font-bold text-[#333333]">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-[#bbd0ff] to-[#bbd0ff] text-[#ffffff] px-4 py-2 rounded-full text-sm shadow-lg">
//                     Completed
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-[#333333]">
//                   <p className="flex items-center">
//                     <Clock className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.difficulty}
//                   </p>
//                   <p>
//                     <strong>Winners:</strong> {hack.winners.join(", ")}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//       <About />
//       <div className="fixed bottom-10 right-10 z-50"> {/* Fixed position for the chatbot */}
//         <Chatbot />
//       </div>
//     </div>
//   );
// };

// export default LandingPage;





// import { useState, useEffect } from "react";
// import { Calendar, Trophy, Users, Clock, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import NavBar from "./Navbar";
// import About from "./About";
// import axios from "axios";
// import Chatbot from "../Chatbot"; // Import the Chatbot component

// const LandingPage = () => {
//   const [upcoming, setUpcoming] = useState([]);
//   const [past, setPast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchHacks = async () => {
//       try {
//         const upcomingRes = await axios.get("http://localhost:3000/api/hackathons/upcoming");
//         const pastRes = await axios.get("http://localhost:3000/api/hackathons/past");
//         setUpcoming(upcomingRes.data || []);
//         setPast(pastRes.data || []);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch hackathon data.");
//         setLoading(false);
//       }
//     };
//     fetchHacks();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.5, duration: 0.8 } },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//   };

//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 1 } },
//   };

//   const handleEventClick = (hackTitle) => {
//     navigate(`/event?hackname=${encodeURIComponent(hackTitle)}`); // Navigate to the event page with the title
//   };

//   if (loading) return <div className="flex items-center justify-center text-[#bbd0ff]">Loading...</div>;
//   if (error) return <div className="flex items-center justify-center text-red-400">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#ffd6ff] via-white to-[#e7c6ff] text-[#333333] relative">
//       <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba]" />
//       <NavBar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <motion.div className="text-center mb-16" variants={fadeInVariants}>
//           <h1
//             className="text-6xl font-extrabold text-[#03045e] drop-shadow-lg transform transition-transform duration-300 hover:scale-105"
//             style={{
//               textShadow: "2px 2px 0 rgba(255, 105, 180, 0.7), 4px 4px 0 rgba(255, 105, 180, 0.5)",
//             }}
//           >
//             Build. Compete. Innovate.
//           </h1>
//           <p className="text-[#333333] text-xl font-semibold max-w-2xl mx-auto">
//             Join virtual hackathons and showcase your skills.
//           </p>
//         </motion.div>
//         <motion.div className="mb-16" variants={containerVariants}>
//           <h2 className="text-4xl font-bold text-[#333333] mb-8 flex items-center">
//             <Calendar className="mr-2 text-[#ff6a88]" /> Upcoming
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {upcoming.map((hack) => (
//               <motion.div
//                 key={hack.title}
//                 onClick={() => handleEventClick(hack.title)} // Add click handler
//                 className="cursor-pointer bg-gradient-to-br from-[#e7c6ff] to-[#c8b6ff] rounded-2xl p-8 border border-[#c8b6ff] shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-2xl font-bold text-[#333333]">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba] text-[#2c3e50] px-4 py-2 rounded-full text-sm shadow-lg">
//                     {hack.status}
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-[#333333]">
//                   <p className="flex items-center">
//                     <Clock className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Trophy className="w-5 h-5 mr-2 text-[#ff6a88]" /> Prize: {hack.prize}
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.difficulty}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {hack.skills?.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-gradient-to-r from-black to-[#purple-800] text-[#ffffff] px-4 py-2 rounded-full text-sm border border-[#purple-700]"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//         <motion.div className="mb-16" variants={containerVariants}>
//           <h2 className="text-4xl font-bold text-[#333333] mb-8 flex items-center">
//             <Trophy className="mr-2 text-[#ff6a88]" /> Past
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {past.map((hack) => (
//               <motion.div
//                 key={hack.title}
//                 className="bg-gradient-to-br from-[#b8c0ff] to-[#bbd0ff] rounded-2xl p-8 border border-[#bbd0ff] shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
//                 variants={cardVariants}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-2xl font-bold text-[#333333]">{hack.title}</h3>
//                   <span className="bg-gradient-to-r from-[#bbd0ff] to-[#bbd0ff] text-[#ffffff] px-4 py-2 rounded-full text-sm shadow-lg">
//                     Completed
//                   </span>
//                 </div>
//                 <div className="space-y-3 text-[#333333]">
//                   <p className="flex items-center">
//                     <Clock className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.date}
//                   </p>
//                   <p className="flex items-center">
//                     <Users className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.participants} participants
//                   </p>
//                   <p className="flex items-center">
//                     <Star className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.difficulty}
//                   </p>
//                   <p>
//                     <strong>Winners:</strong> {hack.winners.join(", ")}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Chatbot is moved here */}
//         <div className="absolute bottom-0 right-10 w-[400px] ">
//           <Chatbot />
//         </div>
//       </div>

//       <About />
//     </div>
//   );
// };

// export default LandingPage;







import { useState, useEffect } from "react";
import { Calendar, Trophy, Users, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NavBar from "./Navbar";
import About from "./About";
import axios from "axios";
import Chatbot from "../Chatbot"; // Import the Chatbot component


const LandingPage = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchHacks = async () => {
      try {
        const upcomingRes = await axios.get("http://localhost:3000/api/hackathons/upcoming");
        const pastRes = await axios.get("http://localhost:3000/api/hackathons/past");
        setUpcoming(upcomingRes.data || []);
        setPast(pastRes.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hackathon data.");
        setLoading(false);
      }
    };
    fetchHacks();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5, duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  // const handleHackathonClick = (title) => {
  //   localStorage.setItem("selectedHackathonId", title);
  //   console.log("Selected Hackathon Title:", title); 
  //   navigate('/events');

  // };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading hackathons...
      </div>
    );
  }
  const handleEventClick = (hackTitle) => {
    navigate(`/event?hackname=${encodeURIComponent(hackTitle)}`); // Navigate to the event page with the title
  };

  if (loading) return <div className="flex items-center justify-center text-[#bbd0ff]">Loading...</div>;
  if (error) return <div className="flex items-center justify-center text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffd6ff] via-white to-[#e7c6ff] text-[#333333] relative">
      <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba]" />
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Upcoming Events Section */}
        <motion.div className="text-center mb-16" variants={fadeInVariants}>
          <h1 className="text-6xl font-extrabold text-[#03045e] drop-shadow-lg transform transition-transform duration-300 hover:scale-105"
              style={{
                textShadow: "2px 2px 0 rgba(255, 105, 180, 0.7), 4px 4px 0 rgba(255, 105, 180, 0.5)"
              }}>
            Build. Compete. Innovate.
          </h1>
          <p className="text-[#333333] text-xl font-semibold max-w-2xl mx-auto">Join virtual hackathons and showcase your skills.</p>
        </motion.div>
        <motion.div className="mb-16" variants={containerVariants}></motion.div>
        <motion.div className="mb-16" variants={containerVariants}>
          <h2 className="text-4xl font-bold text-[#333333] mb-8 flex items-center">
            <Calendar className="mr-2 text-[#ff6a88]" /> Upcoming
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcoming.map((hack) => (
              <motion.div
                key={hack.title}
                onClick={() => handleEventClick(hack.title)} 
                className="cursor-pointer bg-gradient-to-br from-[#e7c6ff] to-[#c8b6ff] rounded-2xl p-8 border border-[#c8b6ff] shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
                variants={cardVariants}
                // onClick={() => handleHackathonClick(hack.title)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#333333]">{hack.title}</h3>
                  <span className="bg-gradient-to-r from-[#ff6a88] to-[#ffb3ba] text-[#2c3e50] px-4 py-2 rounded-full text-sm shadow-lg">
                    {hack.status}
                  </span>
                </div>
                <div className="space-y-3 text-[#333333]">
                  <p className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.date}
                  </p>
                  <p className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.participants} participants
                  </p>
                  <p className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-[#ff6a88]" /> Prize: {hack.prize}
                  </p>
                  <p className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.difficulty}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hack.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gradient-to-r from-black to-[#purple-800] text-[#ffffff] px-4 py-2 rounded-full text-sm border border-[#purple-700]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Past Events Section */}
        <motion.div className="mb-16" variants={containerVariants}>
          <h2 className="text-4xl font-bold text-[#333333] mb-8 flex items-center">
            <Trophy className="mr-2 text-[#ff6a88]" /> Past
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {past.map((hack) => (
              <motion.div
                key={hack.title}
                className="bg-gradient-to-br from-[#b8c0ff] to-[#bbd0ff] rounded-2xl p-8 border border-[#bbd0ff] shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105"
                variants={cardVariants}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#333333]">{hack.title}</h3>
                  <span className="bg-gradient-to-r from-[#bbd0ff] to-[#bbd0ff] text-[#ffffff] px-4 py-2 rounded-full text-sm shadow-lg">
                    Completed
                  </span>
                </div>
                <div className="space-y-3 text-[#333333]">
                  <p className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.date}
                  </p>
                  <p className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.participants} participants
                  </p>
                  <p className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-[#ff6a88]" /> {hack.difficulty}
                  </p>
                  <p>
                    <strong>Winners:</strong> {hack.winners.join(", ")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chatbot Positioned After Past Events and Before About */}
        <div className="mb-16">
          <Chatbot />
        </div>

      </div>

      <About />
    </div>
  );
};

export default LandingPage;

