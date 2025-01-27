import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Github, Filter, Search } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("");
  const navigate = useNavigate();

  // Unique tech stacks extraction
  const uniqueTechStacks = [...new Set(projects.flatMap(project => 
    project.techStack.split(',').map(tech => tech.trim())
  ))];

  useEffect(() => {
    // Retrieve projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
    setFilteredProjects(storedProjects);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = projects;

    if (searchTerm) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (techFilter) {
      result = result.filter(project => 
        project.techStack.toLowerCase().includes(techFilter.toLowerCase())
      );
    }

    setFilteredProjects(result);
  }, [searchTerm, techFilter, projects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-purple-800 text-center mb-10 flex items-center justify-center">
          <span>Explore Projects</span>
          <span className="ml-4 text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {filteredProjects.length}
          </span>
        </h2>

        {/* Search and Filter Section */}
        <div className="mb-8 flex space-x-4">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-300"
            />
            <Search className="absolute left-3 top-3 text-purple-400" size={20} />
          </div>

          <div className="relative">
            <select 
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-300"
            >
              <option value="">All Technologies</option>
              {uniqueTechStacks.map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-3 text-purple-400" size={20} />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center text-purple-600 py-10">
            No projects found. Try a different search or filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white group shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/80 p-2 rounded-full hover:bg-white"
                      >
                        <Github size={20} className="text-purple-600" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h5 className="text-xl font-bold text-purple-800 mb-2">{project.title}</h5>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-wide text-purple-600 font-semibold mb-1">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.split(',').map(tech => (
                        <span 
                          key={tech} 
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/project-details", { state: { projectId: index } })}
                    className="mt-4 w-full flex items-center justify-center bg-purple-600 text-white font-medium py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                  >
                    <Eye size={18} className="mr-2" /> View Project Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;