const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');



const xlsx = require('xlsx'); // For reading Excel files if needed
const User = require('./models/User'); // MongoDB User model
const Hackathon = require('./models/Hackathons');
const bodyParser = require('body-parser');
const Feedback = require('./models/Teams');
const Team = require('./models/RTeam');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const kmeans = require('node-kmeans');
const axios = require('axios');
const Version = require('./models/Version');
const Register=require('./models/Register');
const htmlPdf = require("html-pdf-node");
const nodemailer = require('nodemailer');
const path = require('path');

// Middleware configurations
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:5173',
// }));
// In your existing index.js, add:

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Add this if credentials are being used
}));


// Add these headers explicitly for preflight requests
app.options('*', cors());
app.use(express.json());


app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://maureenmiranda22:PqxEHalWziPVqy7n@cluster0.ive9g.mongodb.net/hack_04d?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('Failed to connect to MongoDB:', err));

// Helper function to map skills and interests to numerical values
const skillMapping = { 'Python': 0, 'Java': 1, 'C++': 2, 'JavaScript': 3, 'HTML/CSS': 4, 'Data Science': 5, 'Machine Learning': 6, 'AI': 7, 'Cloud Computing': 8, 'Cybersecurity': 9 };
const interestMapping = { 'AI': 0, 'Machine Learning': 1, 'Data Science': 2, 'Web Development': 3, 'Cloud Computing': 4, 'Blockchain': 5, 'Cybersecurity': 6, 'Game Development': 7, 'Software Engineering': 8, 'Automation': 9 };


 // Import K-Means library




 // Register endpoint
 app.post('/api/register', async (req, res) => {
   const { name, email, university, major, graduation, password } = req.body;
 console.log(req.body)
 
   // Validate input fields
   if (!name || !email || !university || !major || !graduation|| !password) {
     return res.status(400).json({ message: 'All fields are required' });
   }
 
   try {
     // Check if user already exists
     const existingUser = await User.findOne({ email });
     console.log(existingUser);
     if (existingUser) {
       return res.status(409).json({ message: 'User already exists' });
     }
 
     // Hash the password
     
 
     // Create new user
     const newUser = new Register({
       name,
       email,
       university,
       major,
       graduationYear:graduation,
       password: password,
     });
     console.log()
     await newUser.save();
 
     res.status(201).json({ message: 'User registered successfully', user: newUser });
   } catch (err) {
     res.status(500).json({ message: 'Server error' });
   }
 });



app.post("/api/recommendStudents", async (req, res) => {
  const { skill, interest, participation } = req.body;

  if (!skill || !interest || typeof participation !== "number") {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    // Load the data from the Excel file
    const workbook = xlsx.readFile("./data.xlsx");
    const sheetName = workbook.SheetNames[0];
    const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Preprocess Excel data
    const combinedData = excelData.map(row => ({
      skills: row.skills || "",
      interests: row.interests || "",
      participation: parseInt(row.participation || 0, 10),
      name: row.name || "Unknown",
    }));

    // Convert data for clustering
    const skillMapping = {};
    const interestMapping = {};
    let skillIndex = 0;
    let interestIndex = 0;

    const transformedData = combinedData.map(user => {
      if (!(user.skills in skillMapping)) {
        skillMapping[user.skills] = skillIndex++;
      }
      if (!(user.interests in interestMapping)) {
        interestMapping[user.interests] = interestIndex++;
      }
      return [
        skillMapping[user.skills],
        interestMapping[user.interests],
        user.participation,
      ];
    });

    // Add input data to the dataset
    if (!(skill in skillMapping)) {
      skillMapping[skill] = skillIndex++;
    }
    if (!(interest in interestMapping)) {
      interestMapping[interest] = interestIndex++;
    }
    const inputData = [
      skillMapping[skill],
      interestMapping[interest],
      participation,
    ];
    transformedData.push(inputData);

    // Perform K-Means clustering
    kmeans.clusterize(transformedData, { k: 5 }, (err, result) => {
      if (err) {
        console.error("Error during clustering:", err);
        return res.status(500).json({ message: "Clustering failed" });
      }

      const clusters = result.map(cluster => cluster.cluster);
      const centroids = result.map(cluster => cluster.centroid);

      // Find the closest cluster to the input data
      let closestClusterIndex = -1;
      let minDistance = Infinity;
      centroids.forEach((centroid, index) => {
        const distance = Math.sqrt(
          centroid.reduce((sum, value, i) => sum + (value - inputData[i]) ** 2, 0)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestClusterIndex = index;
        }
      });

      // Get students from the closest cluster
      const similarStudents = clusters[closestClusterIndex].map(index => ({
        Name: combinedData[index] ? combinedData[index].name : "Unknown",
        SimilarityScore: Math.sqrt(
          transformedData[index].reduce(
            (sum, value, i) => sum + (value - inputData[i]) ** 2,
            0
          )
        ),
      }));

      // Sort by similarity score
      similarStudents.sort((a, b) => a.SimilarityScore - b.SimilarityScore);

      // Return the top 10 similar students
      res.status(200).json(similarStudents.slice(0, 10));
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/generate-certificate", async (req, res) => {
  const { username, hackname } = req.body;

  try {
    // HTML for certificate
    const certificateHtml = `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h1>Certificate of Achievement</h1>
        <h3>Presented to</h3>
        <h2>${username}</h2>
        <h4>For successfully participating in</h4>
        <h2>${hackname}</h2>
        <p style="margin-top: 30px;">Issued on ${new Date().toLocaleDateString()}</p>
      </div>
    `;

    const options = { format: "A4", path: "./certificates/certificate.pdf" };

    // Generate PDF
    const file = { content: certificateHtml };
    await htmlPdf.generatePdf(file, options);

    // Set up email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dcmaureenmiranda@gmail.com",
        pass: "jlej tfht ygjs zsrn",
      },
    });

    const mailOptions = {
      from: "dcmaureenmiranda@gmail.com",
      to: "maureen.miranda.22@spit.ac.in", // Replace with the user's email
      subject: "Your Certificate",
      text: `Hello ${username},\n\nPlease find attached your certificate for ${hackname}.`,
      attachments: [
        {
          filename: "certificate.pdf",
          path: path.join(__dirname, "./certificates/certificate.pdf"),
        },
      ],
    };

    // Send Email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error sending email.");
      }
      console.log("Email sent:", info.response);
      return res.status(200).json({ message: "Certificate sent successfully!" });
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    res.status(500).send("Internal Server Error.");
  }
});


// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await (password===user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/hackathons/upcoming', async (req, res) => {
  try {
    const upcomingHackathons = await Hackathon.find({ status: 'Open' });
    res.json(upcomingHackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get past hackathons
app.get('/api/hackathons/past', async (req, res) => {
  try {
    const pastHackathons = await Hackathon.find({ status: { $ne: 'Open' } });
    res.json(pastHackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Endpoint to save feedback
app.post('/api/teams/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(200).send('Feedback submitted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving feedback');
  }
});
app.post('/api/teams', async (req, res) => {
  const { teamName, teamMembers, userId, hackathonId } = req.body;

  // Check if all required data is provided
  if (!teamName || !teamMembers || !userId || !hackathonId) {
    return res.status(400).json({ message: 'Missing required fields: teamName, teamMembers, userId, hackathonId' });
  }

  try {
    // Create new team with userId and hackathonId
    const newTeam = new Team({
      teamName,
      teamMembers,
      userId, // Include the userId of the person registering the team
      hackathonId // Store the hackathonId to link the team with a specific event
    });

    // Save the new team to the database
    await newTeam.save();

    // Respond with success message
    res.status(201).json({
      message: 'Team created successfully',
      team: newTeam
    });
  } catch (error) {
    // Handle any errors that occur during team creation
    res.status(400).json({
      message: 'Error creating team',
      error: error.message
    });
  }
});
app.get('/api/teams/:hackathonTitle', async (req, res) => {
  try {
    const hackathonTitle = req.params.hackathonTitle;
    // Find teams by hackathonTitle
    const teams = await Team.find({ hackathonId: hackathonTitle });
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching teams' });
  }
});

app.patch("/api/teams/:teamId/schedule", async (req, res) => {
  const { teamId } = req.params;
  const { scheduleTime } = req.body;

  try {
    const team = await Team.findByIdAndUpdate(
      teamId,
      { scheduleTime },
      { new: true } // Return updated document
    );

    if (!team) return res.status(404).send("Team not found");
    res.send(team);
  } catch (err) {
    res.status(500).send("Error updating schedule");
  }
});
app.post('/api/hackathons', async (req, res) => {
  const {
    title,
    date,
    participants,
    prize,
    difficulty,
    skills,
    status,
    winners
  } = req.body;

  try {
    const newHackathon = new Hackathon({
      title,
      date,
      participants,
      prize,
      difficulty,
      skills: skills.split(','), // Convert skills into an array of strings
      status,
      winners: winners.split(','), // Convert winners into an array of strings
    });

    await newHackathon.save();
    res.status(201).json({ message: 'Event created successfully', data: newHackathon });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
});

app.get('/api/hackathons', async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hackathons', error });
  }
});
app.get('/api/event/:hackname', async (req, res) => {
  try {
    const { hackname } = req.params;
    console.log(hackname);
    const event = await Hackathon.findOne({ title: hackname });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});
app.get('/api/leaderboards', async (req, res) => {
  try {
    const leaderboard = await Feedback.aggregate([
      {
        $project: {
          teamName: 1,
          totalScore: {
            $sum: ['$innovation', '$creativity', '$ux', '$businessPotential']
          }
        }
      },
      { $sort: { totalScore: -1 } }, // Sort by totalScore in descending order
      { $limit: 3 }                 // Limit to top 3
    ]);
console.log(leaderboard);
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

app.get('/api/leaderboard/:hackathonTitle', async (req, res) => {
  try {
    const hackathonTitle = req.params.hackathonTitle;
    console.log(`Received request for leaderboard of hackathon: ${hackathonTitle}`);

    // Fetch teams for the specific hackathon
    const teams = await Team.find({ hackathonId: hackathonTitle });
    console.log(`Fetched teams for hackathon "${hackathonTitle}":`, teams);

    // Fetch feedback for the specific hackathon
    const teamNames = teams.map(team => team.teamName)
    const feedbacks = await Feedback.find({ teamName: { $in: teamNames } });
    console.log(`Fetched feedbacks for hackathon "${hackathonTitle}":`, feedbacks);

    // Create a map of team feedback
    const feedbackMap = new Map(
      feedbacks.map(feedback => [
        feedback.teamName.toLowerCase(),
        {
          innovation: feedback.innovation,
          creativity: feedback.creativity,
          ux: feedback.ux,
          businessPotential: feedback.businessPotential,
          feedback: feedback.feedback,
          members: feedback.members
        }
      ])
    );
    console.log(`Constructed feedback map:`, feedbackMap);

    // Combine team and feedback data
    const leaderboardData = teams.map(team => {
      const feedback = feedbackMap.get(team.teamName.toLowerCase()) || {};
      const totalScore =
        (feedback.innovation || 0) +
        (feedback.creativity || 0) +
        (feedback.ux || 0) +
        (feedback.businessPotential || 0);

      console.log(`Calculating total score for team "${team.teamName}":`, {
        innovation: feedback.innovation || 0,
        creativity: feedback.creativity || 0,
        ux: feedback.ux || 0,
        businessPotential: feedback.businessPotential || 0,
        totalScore
      });

      return {
        teamName: team.teamName,
        teamMembers: team.teamMembers,
        innovation: feedback.innovation || 0,
        creativity: feedback.creativity || 0,
        ux: feedback.ux || 0,
        businessPotential: feedback.businessPotential || 0,
        feedback: feedback.feedback || "No feedback",
        totalScore: totalScore,
        averageScore: totalScore / 4
      };
    });

    // Sort and rank teams
    const rankedLeaderboard = leaderboardData
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((team, index) => ({
        ...team,
        rank: index + 1
      }));
    console.log(`Ranked leaderboard data:`, rankedLeaderboard);

    res.json(rankedLeaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ message: 'Error generating leaderboard' });
  }
});
const GITHUB_TOKEN = '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'; // Optional for private repos

app.get('/api/commits', async (req, res) => {
  const { owner, repo } = req.query; // Extract owner and repo from the query params

  // Check if both owner and repo are provided
  if (!owner || !repo) {
    return res.status(400).send('Owner and repo parameters are required');
  }

  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);
    res.json(response.data); // Send back the commit data
  } catch (error) {
    console.error('Error fetching commits:', error.message);
    res.status(500).send('Error fetching commit data');
  }
});

app.get('/api/project-data', async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).send('Owner and repo parameters are required');
  }

  try {
    // Fetch commits
    const commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);

    // Fetch branches
    const branchesResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches`);

    // Fetch pull requests
    const pullsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`);

    // Fetch issues
    const issuesResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`);

    // Fetch repository details (stars, forks, etc.)
    const repoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);

    // Send all data in a single response
    res.json({
      commits: commitsResponse.data,
      branches: branchesResponse.data,
      pulls: pullsResponse.data,
      issues: issuesResponse.data,
      repo: repoResponse.data,
    });
  } catch (error) {
    console.error('Error fetching project data:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching project data');
  }
});

app.post('/api/ver', async (req, res) => {
  const { hackname, teamName, gitUrl } = req.body;

  if (!hackname || !teamName || !gitUrl) {
    return res.status(400).json({ message: 'All fields (hackname, teamName, gitUrl) are required.' });
  }

  try {
    // Create a new Team instance and save it to the database
    const newTeam = new Version({ hackname, teamName, gitUrl });
    await newTeam.save();

    res.status(201).json({ message: 'Form submitted successfully!', team: newTeam });
  } catch (error) {
    console.error('Error saving team data:', error);
    res.status(500).json({ message: 'Error submitting form. Please try again.' });
  }
});
app.get('/sub', async (req, res) => {
  const { hackname } = req.query;  // Extract hackname from query params
console.log(hackname);
  if (!hackname) {
    return res.status(400).json({ message: 'Hackathon title (hackname) is required' });
  }

  try {
    // Find all teams for the given hackname
    const teams = await Version.find({ hackname });

    if (teams.length === 0) {
      return res.status(404).json({ message: 'No teams found for this hackathon' });
    }

    // Map the results to include teamName, gitUrl, and a button for "Track Progress"
    const teamData = teams.map((team) => ({
      teamName: team.teamName,
      gitUrl: team.gitUrl,
    }));

    // Send the team data in the response
    res.json({ teams: teamData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/events/addMentor', async (req, res) => {
  const { eventId, mentor } = req.body;

  try {
    // Find the hackathon and update its mentors array
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      eventId,
      { $push: { mentors: mentor } },
      { new: true } // Return the updated document
    );

    if (!updatedHackathon) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ 
      message: 'Mentor added successfully', 
      mentor: mentor 
    });
  } catch (error) {
    console.error('Error adding mentor:', error);
    res.status(500).json({ message: 'Error adding mentor', error: error.message });
  }
});

app.patch('/api/teams/:teamName/mentor', async (req, res) => {
  const { teamName } = req.params;  // Using teamName instead of teamId
  const { mentorName, mentorEmail, scheduleTime } = req.body;

  console.log('Received teamName:', teamName);

  try {
    // Find team by teamName instead of teamId
    const team = await Team.findOne({ teamName: teamName });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Proceed with your mentor assignment logic
    team.assignedMentor = {
      name: mentorName,
      email: mentorEmail
    };
    team.scheduleTime = scheduleTime;

    await team.save();
    res.status(200).json(team);
  } catch (err) {
    console.error('Error in mentor assignment:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

app.get('/team/mentor', async (req, res) => {
  try {
    const { teamName } = req.query;
    
    // Find the team by team name
    const team = await Team.findOne({ teamName }).select('assignedMentor -_id');
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    // Return the assigned mentor
    if (team.assignedMentor) {
      return res.json({ 
        mentor: {
          name: team.assignedMentor.name,
          email: team.assignedMentor.email,
          Date: team.scheduleTime
        }
      });
    } else {
      return res.status(404).json({ message: 'No mentor assigned' });
    }
  } catch (error) {
    console.error('Error fetching mentor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post("/generate-certificate", async (req, res) => {
  const { username, hackname} = req.body;
  try {
      const certificateHtml = `
      <html>
      <head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
              body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f2f5; }
              .certificate-container { 
                  width: 1000px; 
                  background-color: white; 
                  border: 3px solid #2C3E50; 
                  border-radius: 20px; 
                  box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
                  padding: 40px; 
                  text-align: center; 
                  position: relative; 
                  overflow: hidden;
              }
              .header-image { 
                  position: absolute; 
                  top: 0; 
                  left: 0; 
                  right: 0; 
                  height: 100px; 
                  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%232980B9" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,202.7C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0L240,0C192,0,96,0,48,0L0,0Z"></path></svg>'); 
                  background-size: cover; 
                  background-position: center;
              }
              .logo { 
                  width: 150px; 
                  height: 150px; 
                  position: absolute; 
                  top: 40px; 
                  left: 40px; 
                  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23E74C3C"><circle cx="50" cy="50" r="45"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="40">HC</text></svg>');
                  background-size: cover;
              }
              .certificate-content { 
                  position: relative; 
                  z-index: 10; 
                  margin-top: 100px; 
              }
              h1 { color: #2C3E50; font-size: 42px; font-weight: 700; margin-bottom: 20px; }
              .participant-name { color: #27AE60; font-size: 48px; font-weight: 700; margin: 20px 0; }
              .hackathon-name { color: #E74C3C; font-size: 36px; font-weight: 600; }
              .footer { 
                  margin-top: 30px; 
                  border-top: 2px solid #7F8C8D; 
                  padding-top: 20px; 
              }
          </style>
      </head>
      <body>
          <div class="certificate-container">
              <div class="header-image"></div>
              <div class="logo"></div>
              <div class="certificate-content">
                  <h1>Certificate of Achievement</h1>
                  <p>This is to certify that</p>
                  <div class="participant-name">${username}</div>
                  <p>has successfully participated in</p>
                  <div class="hackathon-name">${hackname}</div>
                  <div class="footer">
                      <p>Issued on ${new Date().toLocaleDateString()}</p>
                      <p style="font-style: italic;">Certificate provided by HackCentral</p>
                  </div>
              </div>
          </div>
      </body>
      </html>`;

      const options = { 
          format: "A4", 
          path: `./certificates/${username}_${hackname}_certificate.pdf`,
          border: {
              top: "20mm",
              right: "20mm",
              bottom: "20mm",
              left: "20mm"
          }
      };

      const file = { content: certificateHtml };
      await htmlPdf.generatePdf(file, options);

      // Email sending logic remains the same as previous example
      const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
              user: 'dcmaureenmiranda@gmail.com',
              pass: 'jlej tfht ygjs zsrn',
          },
      });

      const mailOptions = {
          from: 'dcmaureenmiranda@gmail.com',
          to: 'dcmaureenmiranda@gmail.com',
          subject: `Certificate for ${hackname}`,
          text: `Congratulations ${username}! 🎉\n\nPlease find attached your certificate for ${hackname}.\n\nBest regards,\nHackCentral Team`,
          attachments: [
              {
                  filename: `${username}_${hackname}_certificate.pdf`,
                  path: path.join(__dirname, `./certificates/${username}_${hackname}_certificate.pdf`),
              },
          ],
      };

      await transporter.sendMail(mailOptions);
      
      res.status(200).json({ 
          message: "Certificate generated and sent successfully!", 
          certificatePath: `./certificates/${username}_${hackname}_certificate.pdf` 
      });

  } catch (error) {
      console.error("Error generating certificate:", error);
      res.status(500).send("Internal Server Error.");
  }
});



app.post('/get-common-teams', async (req, res) => {
  const { hackathonId } = req.body;

  try {
    // Fetch all teams for the hackathon
    const teams = await Team.find({ hackathonId });

    // Get the team names for the hackathon
    const teamNamesInHackathon = teams.map((team) => team.teamName);

    // Fetch feedbacks with matching team names
    const feedbacks = await Feedback.find({ teamName: { $in: teamNamesInHackathon } });

    // Map to store the latest occurrence of each teamName
    const teamMap = new Map();

    feedbacks.forEach((feedback) => {
      teamMap.set(feedback.teamName, feedback);
    });

    const commonTeams = Array.from(teamMap.values()).map((feedback) => {
      const matchingTeam = teams.find((team) => team.teamName === feedback.teamName);
      return {
        teamName: feedback.teamName,
        members: matchingTeam ? matchingTeam.teamMembers : [],
      };
    });

    res.status(200).json({ commonTeams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});




app.get('/api/users/:name', async (req, res) => {
  try {
    const user = await Register.findOne({ name: req.params.name });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

