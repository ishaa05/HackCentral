import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  GitCommit, GitBranch, AlertCircle, 
  Code, Clock, Users 
} from 'lucide-react';

const CommitHistory = ({ owner, repo }) => {
  const [projectData, setProjectData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/project-data`, {
          headers: {
            'Authorization': `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`,
          },
          params: { owner, repo },
        });
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
   
    fetchProjectData();
  }, [owner, repo]);

  const checkRateLimit = async () => {
    try {
      const response = await axios.get('https://api.github.com/rate_limit', {
        headers: {
          'Authorization': `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`,
        },
      });

      
  
      const resetTime = new Date(response.data.resources.core.reset * 1000); // Convert from seconds to milliseconds
      console.log(`Rate limit will reset at: ${resetTime.toLocaleString()}`);
    } catch (error) {
      console.error('Error fetching rate limit status:', error);
    }
  };

  if (!projectData) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Data Transformations
  const commitFrequencyData = projectData.commits.reduce((acc, commit) => {
    const date = new Date(commit.commit.author.date).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.commits++;
    } else {
      acc.push({ date, commits: 1 });
    }
    return acc;
  }, []);

  const contributorCommits = projectData.commits.reduce((acc, commit) => {
    const author = commit.commit.author.name;
    const existing = acc.find(item => item.name === author);
    if (existing) {
      existing.commits++;
    } else {
      acc.push({ name: author, commits: 1 });
    }
    return acc;
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-3 gap-4">
            {/* Quick Stats */}
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <GitCommit className="mr-4 text-blue-500" />
              <div>
                <h4 className="text-gray-600">Total Commits</h4>
                <p className="text-2xl font-bold">{projectData.commits.length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <GitBranch className="mr-4 text-green-500" />
              <div>
                <h4 className="text-gray-600">Total Branches</h4>
                <p className="text-2xl font-bold">{projectData.branches.length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              
              <div>
                <h4 className="text-gray-600">Open Pull Requests</h4>
                <p className="text-2xl font-bold">
                  {projectData.pulls.filter(pr => pr.state === 'open').length}
                </p>
              </div>
            </div>
          </div>
        );
      case 'commits':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Commit Frequency</h3>
            <LineChart width={600} height={300} data={commitFrequencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="commits" stroke="#3B82F6" />
            </LineChart>

            <h3 className="text-xl font-semibold mt-8 mb-4">Top Contributors</h3>
            <BarChart width={600} height={300} data={contributorCommits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="commits" fill="#10B981" />
            </BarChart>
          </div>
        );
      case 'details':
        return (
          <div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">Recent Commits</h3>
                {projectData.commits.slice(0, 5).map(commit => (
                  <div key={commit.sha} className="mb-3 p-3 bg-gray-100 rounded">
                    <p><strong>{commit.commit.message}</strong></p>
                    <p className="text-sm text-gray-600">
                      {commit.commit.author.name} 
                      | {new Date(commit.commit.author.date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Open Issues</h3>
                {projectData.issues.filter(issue => issue.state === 'open').slice(0, 5).map(issue => (
                  <div key={issue.id} className="mb-3 p-3 bg-gray-100 rounded">
                    <p><strong>{issue.title}</strong></p>
                    <p className="text-sm text-gray-600">
                      Created: {new Date(issue.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      {/* Repository Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{projectData.repo.name}</h2>
          <p className="text-gray-600">{owner}/{repo}</p>
        </div>
        <div className="flex space-x-2">
          <span className="flex items-center bg-blue-100 px-3 py-1 rounded">
            <Users className="mr-2 text-blue-500" size={16} />
            Stars: {projectData.repo.stargazers_count}
          </span>
          <span className="flex items-center bg-green-100 px-3 py-1 rounded">
            <GitBranch className="mr-2 text-green-500" size={16} />
            Forks: {projectData.repo.forks_count}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <nav className="-mb-px flex space-x-4">
          {['overview', 'commits', 'details'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 ${
                activeTab === tab 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              } capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  );
};

export default CommitHistory;