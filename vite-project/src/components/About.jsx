

import { Calendar, Users, Trophy, Star } from "lucide-react";

const About = () => {
  return (
    <div
      id="about"
      className=" mx-auto px-4 py-16 bg-gradient-to-br from-purple-950 via-black to-purple-950 text-white rounded-xl shadow-lg"
    >
      <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-orange-400 via-purple-500 to-pink-600 text-transparent bg-clip-text mb-8">
        About HackCentral
      </h2>
      <p className="text-lg text-purple-300 leading-relaxed max-w-3xl mx-auto text-center">
        HackCentral is a platform dedicated to connecting developers, designers,
        and innovators from all around the world through exciting virtual
        hackathons. Our mission is to provide a collaborative environment where
        tech enthusiasts can showcase their skills, build innovative solutions,
        and network with industry leaders.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="flex items-center space-x-4">
          <Calendar className="w-12 h-12 text-orange-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Events</h3>
            <p className="text-purple-300">
              Participate in numerous hackathons covering diverse topics and
              technologies.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Users className="w-12 h-12 text-orange-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Community</h3>
            <p className="text-purple-300">
              Join a thriving community of passionate developers and tech
              enthusiasts.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Trophy className="w-12 h-12 text-orange-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Recognition</h3>
            <p className="text-purple-300">
              Earn rewards and gain recognition for your innovative solutions.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Star className="w-12 h-12 text-orange-400" />
          <div>
            <h3 className="text-xl font-semibold text-white">Skills</h3>
            <p className="text-purple-300">
              Enhance your technical skills through hands-on experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
