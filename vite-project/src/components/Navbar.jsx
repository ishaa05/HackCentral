// import {useState} from 'react'
// import {Search} from 'lucide-react'
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [searchFocused, setSearchFocused] = useState(false);
//   const navigate = useNavigate();

//   const handleSignUpClick = () => {
//     navigate('/login');
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-gradient-to-r from-black to-purple-950 border-b border-purple-800 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 text-transparent bg-clip-text">
//               HackCentral
//             </span>
//             <div className="flex items-center space-x-8">
//               <div
//                 className={`relative ${
//                   searchFocused ? "w-64" : "w-48"
//                 } transition-all duration-300`}
//               >
//                 <input
//                   type="text"
//                   placeholder="Search hackathons..."
//                   className="w-full bg-black border border-purple-700 rounded-lg px-4 py-2 text-purple-200 placeholder-purple-400"
//                   onFocus={() => setSearchFocused(true)}
//                   onBlur={() => setSearchFocused(false)}
//                 />
//                 <Search className="absolute right-3 top-2.5 h-5 w-5 text-purple-400" />
//               </div>
//               <a
//                 href="#about"
//                 className="text-purple-200 hover:text-orange-400 transition-colors"
//               >
//                 About
//               </a>
//               <Link
//                 to="/"
//                 className="text-purple-200 hover:text-orange-400 transition-colors"
//               >
//                 Hackathons
//               </Link>
//               <Link
//                 to="/"
//                 className="text-purple-200 hover:text-orange-400 transition-colors"
//               >
//                 Leaderboard
//               </Link>
//               <a
//                 href="http://localhost:8503/"
//                 className="text-purple-200 hover:text-orange-400 transition-colors"
//               >
//                 HackIdea
//               </a>
//               <Link
//                 to="/form"
//                 className="text-purple-200 hover:text-orange-400 transition-colors"
//               >
//                 Share
//               </Link><Link
//                 to="/projects"
//                 className="text-purple-200 hover:text-orange-400 transition-colors"
//               >
//                 Projects
//               </Link>
//               <button onClick={handleSignUpClick} className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white px-6 py-2 rounded-lg shadow-lg">
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//   )
// }

// export default Navbar




import {useState} from 'react'
import {Search} from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/login');
  };
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-black to-purple-950 border-b border-purple-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 text-transparent bg-clip-text">
              HackCentral
            </span>
            <div className="flex items-center space-x-8">
              <div
                className={`relative ${
                  searchFocused ? "w-64" : "w-48"
                } transition-all duration-300`}
              >
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  className="w-full bg-black border border-purple-700 rounded-lg px-4 py-2 text-purple-200 placeholder-purple-400"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-purple-400" />
              </div>
              <a
                href="#about"
                className="text-purple-200 hover:text-orange-400 transition-colors"
              >
                About
              </a>
              <Link
                to="/"
                className="text-purple-200 hover:text-orange-400 transition-colors"
              >
                Hackathons
              </Link>
              <Link
                to="/"
                className="text-purple-200 hover:text-orange-400 transition-colors"
              >
                Leaderboard
              </Link>
              <a
                href="http://localhost:8503/"
                className="text-purple-200 hover:text-orange-400 transition-colors"
              >
                HackIdea
              </a>
              <Link
                to="/form"
                className="text-purple-200 hover:text-orange-400 transition-colors"
              >
                Share
              </Link><Link
                to="/projects"
                className="text-purple-200 hover:text-orange-400 transition-colors"
              >
                Projects
              </Link>
              <button onClick={handleSignUpClick} className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white px-6 py-2 rounded-lg shadow-lg">
                Login
              </button>
              <button onClick={handleRegisterClick} className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white px-6 py-2 rounded-lg shadow-lg">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar