import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkSessionSchema } from "@shared/schema";
import { z } from "zod";
import { getChatResponse } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (for demo, always return the default user)
  app.get("/api/user", async (req, res) => {
    const user = await storage.getUser("default-user");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

  // Get current work status
  app.get("/api/work-status", async (req, res) => {
    const activeSession = await storage.getActiveWorkSession("default-user");
    res.json({
      isWorking: !!activeSession,
      activeSession: activeSession || null
    });
  });

  // Clock in
  app.post("/api/clock-in", async (req, res) => {
    try {
      // Check if already clocked in
      const activeSession = await storage.getActiveWorkSession("default-user");
      if (activeSession) {
        return res.status(400).json({ message: "Already clocked in" });
      }

      const session = await storage.createWorkSession({
        userId: "default-user",
        clockInTime: new Date(),
        clockOutTime: null
      });

      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to clock in" });
    }
  });

  // Clock out
  app.post("/api/clock-out", async (req, res) => {
    try {
      const activeSession = await storage.getActiveWorkSession("default-user");
      if (!activeSession) {
        return res.status(400).json({ message: "No active work session" });
      }

      const session = await storage.clockOut(activeSession.id, new Date());
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Failed to clock out" });
    }
  });

  // Get work sessions
  app.get("/api/work-sessions", async (req, res) => {
    const sessions = await storage.getUserWorkSessions("default-user");
    res.json(sessions);
  });

  // Get today's work sessions
  app.get("/api/work-sessions/today", async (req, res) => {
    const today = new Date();
    const sessions = await storage.getUserWorkSessionsForDate("default-user", today);
    res.json(sessions);
  });

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Besked er påkrævet" });
      }

      // Get user context
      const activeSession = await storage.getActiveWorkSession("default-user");
      const workStatus = activeSession ? "på arbejde" : "ikke på arbejde";
      const context = `Brugeren er i øjeblikket ${workStatus}.`;

      const response = await getChatResponse(message, context);
      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Der opstod en fejl" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
