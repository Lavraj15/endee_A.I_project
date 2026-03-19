# 🤖 AI Chatbot (Full Stack Project)

## 📌 Overview
AI Chatbot is a web-based application that allows users to interact with an intelligent assistant in real time. The chatbot processes user queries and generates smart responses using AI APIs.

---

## 🚀 Features
- 💬 Real-time chat interface
- 🤖 AI-powered responses
- ⚡ Fast and responsive UI
- 🌐 REST API (Node.js + Express)
- 🔐 Secure API key handling using environment variables
- 📱 Clean and modern UI (Tailwind CSS)

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- HTML + Tailwind CSS
- JavaScript (Frontend + Backend)
- OpenRouter API (AI Integration)

---

## 🧠 How it Works
1. User enters a message in the chat UI  
2. Frontend sends request to backend API (`/chat`)  
3. Backend processes the request  
4. AI API generates a response  
5. Response is sent back and displayed in chat  

---

## 🔌 API Endpoint

### POST `/chat`

**Request:**
```json
{
  "message": "Hello"
}
