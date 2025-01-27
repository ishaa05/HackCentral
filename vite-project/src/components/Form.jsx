import React, { useState, useRef } from "react";
import { Upload, FileImage, AlertTriangle, CheckCircle } from "lucide-react";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    challenges: "",
    achievements: "",
    githubLink: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = async (file) => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dylm4tisu/image/upload`;
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "fundbridge");

    try {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image. Status: ${response.status}`);
      }

      const data = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        image: data.secure_url,
      }));
      setUploadSuccess(true);
      setError("");
    } catch (error) {
      setError("Image upload failed. Please try again.");
      setUploadSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = ["title", "description", "techStack", "challenges", "achievements", "image"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError("Please fill in all required fields, including uploading an image.");
      return;
    }

    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
    existingProjects.push(formData);
    localStorage.setItem("projects", JSON.stringify(existingProjects));

    alert("Project submitted successfully!");
    setFormData({
      title: "",
      description: "",
      techStack: "",
      challenges: "",
      achievements: "",
      githubLink: "",
      image: "",
    });
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-purple-600 text-white p-6 text-center">
          <h2 className="text-3xl font-bold">Submit Your Project</h2>
          <p className="text-purple-100 mt-2">Showcase your amazing work</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="mr-3 text-red-500" />
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="techStack">
                  Tech Stack *
                </label>
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., React, Node.js, MongoDB"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Provide a brief project description"
                rows={4}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="challenges">
                  Challenges *
                </label>
                <textarea
                  id="challenges"
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What challenges did you face?"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="achievements">
                  Achievements *
                </label>
                <textarea
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What did you achieve?"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="githubLink">
                  GitHub Link
                </label>
                <input
                  type="url"
                  id="githubLink"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter GitHub repository link"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Screenshot *
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <div 
                  onClick={triggerFileInput}
                  className={`w-full h-36 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 
                    ${uploadSuccess 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'}`}
                >
                  {uploadSuccess ? (
                    <>
                      <CheckCircle className="text-green-500 mb-2" size={40} />
                      <span className="text-green-600">Image Uploaded Successfully</span>
                    </>
                  ) : (
                    <>
                      <Upload className="text-gray-400 mb-2" size={40} />
                      <span className="text-gray-600">Click to Upload Screenshot</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.image}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Submit Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;