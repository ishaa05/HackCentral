import React, { useState } from "react";
import axios from "axios";
import { Award, FileText } from 'lucide-react';

const CertificateForm = () => {
  const [username, setUsername] = useState("");
  const [hackname, setHackname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/generate-certificate", {
        username,
        hackname,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-700">
        <div className="flex items-center justify-center mb-6">
          <Award className="w-12 h-12 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">Certificate Generator</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Hackathon Name</label>
            <input
              type="text"
              placeholder="Enter hackathon name"
              value={hackname}
              onChange={(e) => setHackname(e.target.value)}
              required
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <FileText className="w-5 h-5" />
            <span>{isLoading ? 'Generating...' : 'Generate Certificate'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CertificateForm;