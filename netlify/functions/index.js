const express = require('express');
const serverless = require('serverless-http');

// Import your existing routes and config
const { storage } = require('../../server/storage');
const { config } = require('../../server/config');

const app = express();
app.use(express.json());

// API routes
app.get('/api/work-status', async (req, res) => {
  const activeSession = await storage.getActiveWorkSession("default-user");
  res.json({
    isWorking: !!activeSession,
    activeSession: activeSession || null
  });
});

app.post('/api/clock-in', async (req, res) => {
  try {
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

app.post('/api/clock-out', async (req, res) => {
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

app.get('/api/work-sessions', async (req, res) => {
  const sessions = await storage.getUserWorkSessions("default-user");
  res.json(sessions);
});

app.get('/api/work-sessions/today', async (req, res) => {
  const today = new Date();
  const sessions = await storage.getUserWorkSessionsForDate("default-user", today);
  res.json(sessions);
});

// Export the serverless function
exports.handler = serverless(app); 