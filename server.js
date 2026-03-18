const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load data
const data = fs.readFileSync(__dirname + "/data/pgdata.txt", "utf-8").split("\n");

// 🔍 Smart search function
function searchPG(query) {
    if (!query) return ["No matching PG found"];

    const words = query.toLowerCase().split(" ");

    let results = data.map(item => {
        let score = 0;
        let itemText = item.toLowerCase();

        words.forEach(word => {
            if (itemText.includes(word)) {
                score++;
            }
        });

        return { item, score };
    });

    results.sort((a, b) => b.score - a.score);

    let filtered = results.filter(r => r.score > 0).map(r => r.item);

    return filtered.length > 0 ? filtered : ["No matching PG found"];
}

// 🤖 AI-style response (without API)
function formatResponse(results, query) {

    if (!query) query = "";

    if (results[0] === "No matching PG found") {
        return `🤖 Sorry, I couldn't find any PG matching "${query}". Try different keywords.`;
    }

    const words = query.toLowerCase().split(" ");

    let response = `🤖 Based on your search "${query}", here are the best options:\n\n`;

    if (words.includes("cheap") || words.includes("budget") || words.includes("low")) {
        response += "💰 Budget-friendly options:\n";
    } 
    else if (words.includes("luxury") || words.includes("premium")) {
        response += "🏢 Premium options:\n";
    } 
    else if (words.includes("good") || words.includes("best")) {
        response += "⭐ Recommended PGs:\n";
    } 
    else {
        response += "📌 Available options:\n";
    }

    results.forEach((item, index) => {
        response += `${index + 1}. ${item}\n`;
    });

    return response;
}

// 🚀 API
app.post("/ask", (req, res) => {
    const { question } = req.body;

    const results = searchPG(question);

    const answer = formatResponse(results, question); // ✅ FIX

    res.json({
        answer: answer
    });
});

app.get("/", (req, res) => {
    res.send("PG Finder AI Server Running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});