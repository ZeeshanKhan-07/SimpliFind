# SimpliFind – YouTube Comment Filtering

SimpliFind is the smart way to save time. Instead of scrolling through thousands of YouTube comments, simply paste the video URL and describe the type of comment you're looking for. SimpliFind will quickly find the most relevant comments that match your needs. If you want to learn more about a specific comment or have any questions regarding it, our AI assistant is always ready to help by providing detailed insights and explanations.

## Application Preview

###Landing Page 
<img width="960" height="540" alt="Screenshot 2026-07-17 163921" src="https://github.com/user-attachments/assets/10db699a-292c-45ce-995b-b105f667b1b0" />

### Why SimpliFind?
<img width="960" height="540" alt="Screenshot 2026-07-17 163955" src="https://github.com/user-attachments/assets/7712a35d-019b-4256-bcf4-6894b3e1469e" />

###How It Works.
<img width="960" height="540" alt="Screenshot 2026-07-17 164018" src="https://github.com/user-attachments/assets/ab2c867f-fc1c-41a6-a2d8-98974de2b808" />

###Features 
<img width="960" height="540" alt="Screenshot 2026-07-17 164029" src="https://github.com/user-attachments/assets/a012bf25-994a-4c94-a73f-71af9f9611a3" />

###Reviews
<img width="960" height="540" alt="Screenshot 2026-07-17 164041" src="https://github.com/user-attachments/assets/2df7381c-be06-41ad-bf9b-e2a939ec777f" />

###Footer
<img width="960" height="540" alt="Screenshot 2026-07-17 164049" src="https://github.com/user-attachments/assets/d903f27e-caa2-4448-8536-bacec392942f" />

###Login Page
<img width="960" height="540" alt="Screenshot 2026-07-17 164343" src="https://github.com/user-attachments/assets/1e462693-b28a-4344-a14f-7b75e268e71f" />

###Signup Page
<img width="960" height="540" alt="Screenshot 2026-07-17 164324" src="https://github.com/user-attachments/assets/b34330e0-b04c-4383-9e61-424aef2bb1d7" />

###OTP Verification Page
<img width="960" height="540" alt="Screenshot 2026-07-17 165138" src="https://github.com/user-attachments/assets/c258ccf8-bed3-4a83-8eb3-6e06dd0d1a03" />

###Find Comments
<img width="960" height="540" alt="Screenshot 2026-07-17 170156" src="https://github.com/user-attachments/assets/acad519d-8582-4547-9ffb-3127061e8cb9" />
<img width="960" height="540" alt="Screenshot 2026-07-17 170223" src="https://github.com/user-attachments/assets/2cad1e0d-49b9-4ee8-94bd-98130b9a0352" />
<img width="960" height="540" alt="Screenshot 2026-07-17 170234" src="https://github.com/user-attachments/assets/ae710bd1-37c5-4bbf-9a6b-8ec9f7a87087" />

###ASK AI Page
<img width="960" height="540" alt="Screenshot 2026-07-17 170300" src="https://github.com/user-attachments/assets/87de2024-d58e-48cc-ba51-9859404267b5" />
<img width="960" height="540" alt="Screenshot 2026-07-17 170315" src="https://github.com/user-attachments/assets/906b966b-4eda-4689-81c9-8262d8c6f881" />

###User Profile Page
<img width="960" height="540" alt="Screenshot 2026-07-17 170330" src="https://github.com/user-attachments/assets/e0f0d2b6-8da1-451b-8242-7537c5abbb26" />
<img width="960" height="540" alt="Screenshot 2026-07-17 181738" src="https://github.com/user-attachments/assets/b9426ac3-eac2-4c95-a0a6-9c2880dca4f5" />

---

🌐 **Live Demo**  
Live Link: https://simplifind.vercel.app


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
