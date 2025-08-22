import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenAI } from "@google/genai";
import { insertPortfolioSearchSchema, insertContactMessageSchema } from "@shared/schema";
import { portfolioData } from "../client/src/data/portfolio-data";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function registerRoutes(app: Express): Promise<Server> {
  // AI-powered portfolio search endpoint
  app.post("/api/portfolio-search", async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query is required and must be a string" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      // Create a detailed prompt for Gemini
      const systemPrompt = `You are an intelligent AI assistant for Ravi Karingu's personal portfolio. 
Your task is to analyze the user's query and the provided JSON data about Ravi's career. 
Return only a JSON array of the unique 'id' fields of the items that best match the query.
If no items match, return an empty array.

Portfolio Data: ${JSON.stringify(portfolioData)}`;

      const userPrompt = `User Query: "${query}"

Please analyze this query against Ravi's portfolio data and return the IDs of relevant items that match the query.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              results: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["results"]
          },
        },
        contents: userPrompt,
      });

      const rawJson = response.text;
      if (!rawJson) {
        throw new Error("Empty response from Gemini API");
      }

      const parsedResponse = JSON.parse(rawJson);
      const results = parsedResponse.results || [];

      // Save the search to storage
      await storage.savePortfolioSearch({
        query,
        results: JSON.stringify(results),
      });

      res.json({ results });
    } catch (error) {
      console.error("Portfolio search error:", error);
      res.status(500).json({ error: "Failed to process search query" });
    }
  });

  // AI Chatbot endpoint
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required and must be a string" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      // Create a comprehensive system prompt
      const systemPrompt = `You are an AI assistant specifically designed to answer questions about Ravi Karingu's professional portfolio and career. 

STRICT GUIDELINES:
1. You must ONLY provide information that is present in the portfolio data provided below
2. Respond in a professional, concise manner
3. If asked about something not in the portfolio data, clearly state: "I can only provide information based on the portfolio content, and I don't have details on that topic here."
4. Do not generate responses based on external knowledge
5. Keep responses focused and directly answer the user's question
6. When listing items, use the exact names/titles as they appear in the portfolio

Portfolio Data: ${JSON.stringify(portfolioData)}

Remember: You are representing Ravi Karingu's professional profile, so maintain a professional tone and only discuss information available in his portfolio.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "text/plain",
        },
        contents: message,
      });

      const botResponse = response.text;
      if (!botResponse) {
        throw new Error("Empty response from Gemini API");
      }

      res.json({ response: botResponse });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.saveContactMessage(validatedData);
      res.json({ success: true, messageId: message.id });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Invalid form data" });
    }
  });

  // GitHub activity proxy endpoint (to avoid CORS issues)
  app.get("/api/github-activity", async (req, res) => {
    try {
      const username = "KARINGU-RAVI"; // GitHub username - should be actual username
      const response = await fetch(`https://api.github.com/users/${username}/events?per_page=10`);
      
      if (!response.ok) {
        throw new Error(`GitHub API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("GitHub API error:", error);
      res.status(500).json({ error: "Failed to fetch GitHub activity" });
    }
  });

  // GitHub stats endpoint
  app.get("/api/github-stats", async (req, res) => {
    try {
      const username = "KARINGU-RAVI";
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      ]);

      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error("GitHub API request failed");
      }

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();

      const stats = {
        repositories: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars: reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0),
        totalForks: reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0),
      };

      res.json(stats);
    } catch (error) {
      console.error("GitHub stats error:", error);
      res.status(500).json({ error: "Failed to fetch GitHub stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
