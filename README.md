## SimpliFind – YouTube Comment Filtering

SimpliFind is the smart way to save time. Instead of scrolling through thousands of YouTube comments, simply paste the video URL and describe the type of comment you're looking for. SimpliFind will quickly find the most relevant comments that match your needs. If you want to learn more about a specific comment or have any questions regarding it, our AI assistant is always ready to help by providing detailed insights and explanations.

## Application Preview




🌐 **Live Demo**  
Frontend: https://simplifind.vercel.app


This project was built to understand real-world full-stack system design, including secure JWT-driven user authentication, asynchronous third-party API integrations, data auditing, and natural language text processing. It features a robust Spring Boot backend integrated with the YouTube Data API to fetch video comments at scale, which are then analyzed using advanced semantic filtering powered by the Gemini API. It showcases high-efficiency data persistence patterns using Spring Data JPA and MySQL, enabling seamless user search history auditing, and features a responsive React frontend designed for interactive, real-time data visualization.
---

## 🚀 Features

### 👤 For Users

- Natural language comment filtering 
- Automated YouTube Data API fetching
- AI-powered semantic matching via Gemini API
- User profile & secure JWT-driven search history tracking  
- OTP-based verification & Google OAuth login


---

## 🧠 Key Engineering Highlights

- Designed **RESTful APIs** with proper separation of concerns across controller, service, and repository tiers 
- Implemented secure authentication using **JWT tokens, refresh tokens, and OTP-based verification**  
- Integrated the **YouTube Data API** to efficiently fetch video comment threads at scale 
- Built an AI-driven filtering engine using the **Gemini API** for semantic matching on user queries 
-Handled search history tracking with automated database auditing using **JPA** lifecycle hooks  
- Followed a modular backend architecture leveraging **Java and Spring Boot** for clean extensibility 


---

## 🛠 Tech Stack

### Backend
- **Framework & Security:** Spring Boot, Spring Security
- **AI & Third-Party APIs:** Gemini API, YouTube Data API
- **Authentication & Validation:** JWT (JSON Web Tokens), Refresh Tokens, OTP Verification
- **Build Tools & Utilities:** Lombok, Maven/Gradle
- **Database:** MySQL  

### Frontend
- **Core Library:** React  
- **Styling & Components:** Tailwind CSS, GSAP(For Animations)
- **State Management & Routing:** Axios (for API consumption), React Router DOM 

### Tools & DevOps
- **Database Management:** MySQL Workbench
- **API Testing:** Postman
- **Version Control:** Git, GitHub
---

## 📋 Prerequisites

- JDK
- MySQL 
- npm or yarn  

---

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZeeshanKhan-07/SimpliFind.git
   cd SimpliFind
   ```

2. **Backend Setup**
   ```bash
   cd backend
   Run the main application file SearchSimilarCommentApplication.java via your IDE or wrapper.
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## ⚙️ Environment Configuration

### VS Code Run & Debug Setup (`launch.json`)
The Spring Boot backend utilizes your Gemini credentials through environment injection. Add your API key directly into your `.vscode/launch.json` file inside the target runner profile:

```json
{
    "configurations": [
        {
            "type": "java",
            "name": "Current File",
            "request": "launch",
            "mainClass": "${file}"
        },
        {
            "type": "java",
            "name": "SearchSimilarCommentApplication",
            "request": "launch",
            "mainClass": "com.youtube.SearchSimilarComment.SearchSimilarCommentApplication",
            "projectName": "youtube-comments-fetcher",
            "env": {
                "GOOGLE_API_KEY": "your_gemini_api_key_here"
            }
        }
    ]
}
```

## 📁 Project Structure

```
SimpliFind/
├── backend/
│   ├── .mvn/                             # Maven wrapper files
│   ├── logs/                             # Application execution logs
│   ├── src/
│   │   └── main/
│   │       ├── java/com/youtube/SearchSimilarComment/
│   │       │   ├── config/               # Security and application configurations
│   │       │   ├── controller/           # REST API Endpoints
│   │       │   ├── dto/                  # Data Transfer Objects (Requests/Responses)
│   │       │   ├── entity/               # Database JPA Entities (User, SearchHistory)
│   │       │   ├── enums/                # Enumerations (e.g., Auth Provider)
│   │       │   ├── exception/            # Custom application exceptions
│   │       │   ├── exceptions/           # Global exception handlers
│   │       │   ├── helpers/              # Utility helper classes
│   │       │   ├── model/                # Application core models
│   │       │   ├── repository/           # Spring Data JPA Repositories
│   │       │   ├── security/             # Security filters (JWT verification)
│   │       │   ├── service/              # Service Interfaces & Implementations
│   │       │   └── SearchSimilarCommentApplication.java  # Main Boot class
│   │       └── resources/                # application.properties / static configurations
│   └── pom.xml                           # Backend Maven dependencies
├── frontend/
│   ├── public/                           # Static assets & index.html
│   ├── src/
│   │   ├── assets/                       # Images, global media files
│   │   ├── components/                   # Reusable UI React components
│   │   ├── images/                       # Project image assets
│   │   ├── pages/                        # View components/application views
│   │   ├── routes/                       # React router definitions
│   │   ├── services/                     # API integration layers (Axios instances)
│   │   ├── store/                        # Redux state management configuration
│   │   ├── App.css                       # Global styling sheet
│   │   ├── App.jsx                       # Core root layout component
│   │   └── main.jsx                      # App startup renderer
│   ├── package.json                      # Frontend dependencies & configurations
│   └── eslint.config.js                  # Frontend linting settings
└── README.md                             # Project documentation
```

## 🔐 Authentication & Authorization

- **Local Authentication:** Regular registration and sign-in managed via secure passwords and one-time password (OTP) verification codes.

- Authentication is handled through JWT tokens.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - Authenticate user, issue JWT/Refresh tokens, and attach secure cookies
- `POST /api/auth/verify` - Verify user account using the email OTP code
- `POST /api/auth/resend` - Resend a new OTP verification code to the user's email

### YouTube & Semantic Search
- `POST /api/youtube/comments/search-comments` - Fetch video comments, filter via Gemini AI matching, and log search records to user history
- `GET /api/youtube/comments/{videoId}/all` - Fetch all raw video comments from a specified YouTube video ID
- `GET /api/youtube/comments/{videoId}` - Fetch paginated, ordered video comments based on relevance or time parameters
- `POST /api/youtube/comments` - Fetch comments via post parameters mapping object configuration payloads
- `GET /api/youtube/comments/health` - Subsystem service health status verification check

### Gemini Chat
- `GET /api/chat/ask` - Send standalone natural language processing prompts directly to the Gemini AI API engine

### User Profile & History
- `GET /api/user-profile` - Fetch the authenticated user's profile data via their active JWT token
- `PUT /api/user-profile/update` - Update account details for the currently logged-in user profile
- `GET /api/user-profile/history` - Retrieve a comprehensive list of a user's search history, filtered securely by their JWT signature and ordered by the latest timestamp


## 📞 Contact 

- To contact, email **zeeshankhanbca26@gmail.com**.
>>>>>>> 4359dca (Implemented the user dashboard and did some changes in README.md file)
