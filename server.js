require("dotenv").config();

console.log("🚀 Server file started...");

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// 🤖 AI function
async function getAIResponse(query) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: query
                    }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("AI Error:", error.response?.data || error.message);
        return "❌ AI error, please try again.";
    }
}

// 🚀 CHAT API
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    const reply = await getAIResponse(message);

    res.json({ reply });
});

// 🌐 TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server working 🚀");
});

// 🔌 SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("✅ Server running on port " + PORT);
});