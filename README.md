🔎 SimpliFind: SimpliFind is the smart way to save time. Instead of scrolling through thousands of YouTube comments, simply paste the video URL and describe the type of comment you're looking for. SimpliFind will quickly find the most relevant comments that match your needs. If you want to learn more about a specific comment or have any questions regarding it, our AI assistant is always ready to help by providing detailed insights and explanations.

🚀 How SimpliFind Works
Experience the future of comment discovery with our simple, three-step process to unlock insights from millions of YouTube comments.

1. Overview of SimpliFind
Simply paste any YouTube video URL into the search box and watch the magic begin.

<img width="947" height="412" alt="Screenshot 2026-06-24 195723" src="https://github.com/user-attachments/assets/e989f38f-8df7-42f9-83a4-07faa83bb3bf" />

<img width="947" height="411" alt="Screenshot 2026-06-24 195819" src="https://github.com/user-attachments/assets/91fe4bfa-9854-49b5-b916-fb299ea58395" />

<img width="947" height="415" alt="Screenshot 2026-06-24 195748" src="https://github.com/user-attachments/assets/81e21df4-82df-46cf-baba-92a2fddf5f1a" />

<img width="949" height="413" alt="Screenshot 2026-06-24 195844" src="https://github.com/user-attachments/assets/b17a9919-d7a8-41d3-a27b-755f886a8162" />

<img width="947" height="410" alt="Screenshot 2026-06-24 195903" src="https://github.com/user-attachments/assets/2e362a58-b234-4d1a-b26d-5872b4716fdd" />

<img width="949" height="412" alt="Screenshot 2026-06-24 195936" src="https://github.com/user-attachments/assets/3c908d85-8cb4-4973-997d-334d50603b30" />

<img width="949" height="271" alt="Screenshot 2026-06-24 195958" src="https://github.com/user-attachments/assets/73c1af74-4aad-459c-80e5-099f73ed8c38" />

SimpliFind – YouTube Comment Discovery Tool
SimpliFind is a tool that helps users discover the most relevant, interesting, and top-voted comments on any YouTube video without endless scrolling. It analyzes video comments and surfaces the ones that matter most, saving users time and helping them find genuine insights, opinions, and discussions hidden in the comment section.

🌐 Live Demo
Frontend: https://simplifind.vercel.app

⚠️ Note
The backend is hosted on Render (free tier).
The first request may take 30–60 seconds due to cold start.
Please wait patiently — subsequent requests are fast.

This project was built to explore real-world frontend architecture, state management at scale, smooth UI animations, and working with third-party APIs like the YouTube Data API.

📸 Screenshots
![Home Page](./screenshots/home.png)
![Search Results](./screenshots/search-results.png)
![Comment Analysis](./screenshots/comment-analysis.png)
![Mobile View](./screenshots/mobile-view.png)

🚀 Features
🔎 For Users
Search any YouTube video by URL or keyword
Instantly surface top and most relevant comments
Filter comments by likes, replies, or recency
Clean, distraction-free reading experience
Smooth, animated UI transitions
Responsive design for mobile and desktop
🧠 Key Engineering Highlights
Built a fast, animated UI using GSAP for micro-interactions
Managed global state efficiently using Zustand
Designed a clean component architecture for scalability
Implemented debounced search for optimal API usage
Handled loading, error, and empty states gracefully
Optimized rendering for large comment datasets
🛠 Tech Stack
Frontend
React
Zustand (state management)
GSAP (animations)
Tailwind CSS
Axios
Backend
Node.js, Express.js
YouTube Data API v3
MongoDB with Mongoose
Security: Helmet, CORS
📋 Prerequisites
Before running this application, make sure you have the following installed:

Node.js (v16 or higher)
MongoDB (local or cloud instance)
npm or yarn package manager
🔧 Installation
Clone the repository

git clone https://github.com/ZeeshanKhan-07/simplifind.git
cd simplifind
Backend Setup

cd backend
npm install
Frontend Setup

cd ../frontend
npm install
⚙️ Environment Configuration
Backend Environment Variables
Create a .env file in the backend directory with the following variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/simplifind
YOUTUBE_API_KEY=your_youtube_api_key
CLIENT_URL=http://localhost:3000
Frontend Environment Variables
Create a .env file in the frontend directory:

VITE_API_URL=http://localhost:5000
VITE_YOUTUBE_API_KEY=your_youtube_api_key
🚀 Running the Application
Start MongoDB (if running locally)

mongod
Start the Backend Server

cd backend
npm run dev
The backend will run on http://localhost:5000

Start the Frontend Application

cd frontend
npm run dev
The frontend will run on http://localhost:3000

📁 Project Structure
simplifind/
├── backend/
│   ├── config/          # Configuration files
│   ├── controller/      # Route controllers
│   ├── lib/            # Utility functions and database connection
│   ├── middleware/     # Middleware functions
│   ├── model/          # MongoDB models
│   ├── routes/         # API route definitions
│   └── index.js        # Main server file
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── store/      # Zustand store
│   │   └── ...         # Other React app files
│   └── package.json
└── README.md
📊 API Endpoints
Videos
GET /api/videos/:id - Get video details
Comments
GET /api/comments/:videoId - Get comments for a video
GET /api/comments/:videoId/top - Get top-ranked comments
Search
GET /api/search - Search for videos by keyword
🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

📞 Support
For support, email support@simplifind.com or open an issue on GitHub.

🙏 Acknowledgments
React and open source community
YouTube Data API
Everyone who provided feedback during development
