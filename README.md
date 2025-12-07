# AI-Powered Natural Language Router

A full-stack Natural Language Router that turns any English question into the right action — weather or database query — and always answers back in clean, human-readable English.

Live endpoint: POST http://localhost:5000/api/ai
Example:

- { "query": "How many employees have salary more than 400000?" }
- → { "response": "5 employees match your query." }

- What it does (in simple words)
  You type a normal English question
  ↓
  An LLM (Groq + Mixtral) decides: “This is about weather” or “This is about employees”
  ↓
  The correct tool is called (Weather API or MongoDB)
  ↓
  You get back only a nice English sentence — never JSON dumps, SQL, or debug text.

# Features

- Natural language → smart routing (LLM decides the tool)
- Weather tool (real OpenWeatherMap API)
- Employee database tool (MongoDB + 10 realistic records)
- Always returns clean English answers
- Zero raw data / SQL / routing info leaked to user
- Folder Structure

├── src/
│ ├── db/
│ │ └── db.js # MongoDB connection
│ ├── models/
│ │ └── Employee.js # Mongoose schema
│ ├── routes/
│ │ └── ask.js # Main /api/ai endpoint
│ ├── services/
│ │ ├── llm.js # LLM routing (Groq)
│ │ └── router.js # Executes the chosen tool
│ ├── tools/
│ │ ├── weatherTool.js
│ │ └── dbTool.js
├── seed.js # Populate database with dummy data
├── server.js # Entry point
├── .env.example # Template for environment variables
└── package.json

# How to Run (step-by-step) =>

# 1. Clone & enter folder

git clone
cd <project-folder>

# 2. Install dependencies

npm install

# 3. Create .env file (copy from .env)

.env

# 4. Fill these in your .env

GROQ_API_KEY=your_groq_key_here # get free at https://console.groq.com
OPENWEATHER_API_KEY=your_openweather_key_here # https://openweathermap.org/api
MONGODB_URI=mongodb://127.0.0.1:27017/ai-router-demo
PORT=5000

# 5. Seed the database with 10 realistic employees

node seed.js

# 6. Start the server

node server.js

# → Server listening on port 5000

Server is now live at http://localhost:5000/api/ai

# Test it instantly (Postman / curl)

- curl -X POST http://localhost:5000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"query":"What is the weather in Paris?"}'

- curl -X POST http://localhost:5000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"query":"How many employees earn over 600000?"}'

- You will always get a clean answer like:
  { "response": "5 employees match your query." }

- Example Queries that work perfectly
  “What’s the weather in London?”
  “How many employees have salary more than 400000?”
  “List employees in Engineering department”
  “Who joined last month?”
  “Find employee named Priya Singh”
  “How many people are in HR?”

# Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Groq (ultra-fast LLM inference)
- OpenWeatherMap API
- Pure JSON routing (no LangChain needed)
