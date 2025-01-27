

const trainingData = [
    {
      domain: 'customer_support',
      examples: [
        {
          input: "What is the registration deadline?",
          output: "The registration deadline is March 10th, 2025, at 11:59 PM PST."
        },
        {
          input: "Are there any participation fees?",
          output: "No, the virtual hackathon is free to participate in."
        },
        {
          input: "Can I join the hackathon solo?",
          output: "Yes, solo participation is allowed, but we encourage forming teams of up to 5 members."
        },
        {
          input: "How do I access the hackathon platform?",
          output: "You can access the platform through the login credentials provided in your registration confirmation email."
        },
        {
          input: "Can I make changes to my team after registration?",
          output: "Yes, you can update your team details until the registration deadline via your dashboard."
        },
        {
          input: "What are the prizes for winners?",
          output: "The winners will receive cash prizes, mentorship opportunities, and swag kits."
        },
        {
          input: "What is the duration of the hackathon?",
          output: "The hackathon runs from March 15th, 2025, at 9 AM PST to March 17th, 2025, at 9 PM PST."
        },
        {
          input: "Can students from different universities form a team?",
          output: "Yes, cross-university teams are welcome."
        },
        {
          input: "Will there be networking opportunities?",
          output: "Yes, there will be dedicated networking sessions and a virtual lounge to connect with other participants."
        },
        {
          input: "How do I contact support during the hackathon?",
          output: "You can reach out to us via the support chat on the platform or email support@virtualhackathon.com."
        }
      ]
    },
    {
      domain: 'technical_support',
      examples: [
        {
          input: "I can't access my dashboard.",
          output: "Please ensure you're using the correct login credentials. If the issue persists, try resetting your password."
        },
        {
          input: "The submission portal is not loading.",
          output: "Clear your browser cache and try again. If the issue continues, check your internet connection and try a different browser."
        },
        {
          input: "How do I integrate the provided APIs?",
          output: "Refer to the API documentation under the 'Resources' tab on your dashboard for detailed integration steps."
        },
        {
          input: "The coding environment is freezing.",
          output: "Refresh the page or try restarting your browser. Make sure your device meets the platform's technical requirements."
        },
        {
          input: "My team members are not visible in the team list.",
          output: "Ensure all members have accepted the invite link sent to their email. If they're still not visible, contact support."
        },
        {
          input: "I'm getting an error when uploading my project.",
          output: "Ensure your project file meets the format and size guidelines. If the issue persists, email the file to support@virtualhackathon.com."
        },
        {
          input: "How do I use the live debugging tool?",
          output: "Click on the 'Debug' tab in the platform menu, select your project, and follow the instructions to debug in real-time."
        },
        {
          input: "The live leaderboard is not updating.",
          output: "Leaderboard updates may take a few minutes. If the problem persists, refresh your page or contact support."
        },
        {
          input: "I can't access the video conferencing link for mentoring sessions.",
          output: "Check your email for the latest mentoring session link. If you can’t find it, visit the 'Mentoring' section on your dashboard."
        },
        {
          input: "My teammate's code is not syncing with mine in the collaborative editor.",
          output: "Ensure both of you are connected to the internet. If the issue persists, rejoin the collaborative session or restart your editor."
        }
      ]
    }
  ];
  
  module.exports = trainingData;
  
  
  module.exports = trainingData;
  