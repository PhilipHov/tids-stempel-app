import { type User, type InsertUser, type WorkSession, type InsertWorkSession } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getActiveWorkSession(userId: string): Promise<WorkSession | undefined>;
  createWorkSession(session: InsertWorkSession): Promise<WorkSession>;
  clockOut(sessionId: string, clockOutTime: Date): Promise<WorkSession>;
  getUserWorkSessions(userId: string, limit?: number): Promise<WorkSession[]>;
  getUserWorkSessionsForDate(userId: string, date: Date): Promise<WorkSession[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private workSessions: Map<string, WorkSession>;

  constructor() {
    this.users = new Map();
    this.workSessions = new Map();
    
    // Create default user for demo
    const defaultUser: User = {
      id: "default-user",
      username: "philip",
      name: "Philip"
    };
    this.users.set(defaultUser.id, defaultUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getActiveWorkSession(userId: string): Promise<WorkSession | undefined> {
    return Array.from(this.workSessions.values()).find(
      (session) => session.userId === userId && session.isActive
    );
  }

  async createWorkSession(insertSession: InsertWorkSession): Promise<WorkSession> {
    const id = randomUUID();
    const session: WorkSession = { 
      ...insertSession, 
      id, 
      isActive: true,
      clockOutTime: insertSession.clockOutTime || null
    };
    this.workSessions.set(id, session);
    return session;
  }

  async clockOut(sessionId: string, clockOutTime: Date): Promise<WorkSession> {
    const session = this.workSessions.get(sessionId);
    if (!session) {
      throw new Error("Work session not found");
    }
    
    const updatedSession: WorkSession = {
      ...session,
      clockOutTime,
      isActive: false
    };
    
    this.workSessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  async getUserWorkSessions(userId: string, limit = 10): Promise<WorkSession[]> {
    return Array.from(this.workSessions.values())
      .filter((session) => session.userId === userId)
      .sort((a, b) => new Date(b.clockInTime).getTime() - new Date(a.clockInTime).getTime())
      .slice(0, limit);
  }

  async getUserWorkSessionsForDate(userId: string, date: Date): Promise<WorkSession[]> {
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    return Array.from(this.workSessions.values())
      .filter((session) => {
        const clockInDate = new Date(session.clockInTime);
        return session.userId === userId && 
               clockInDate >= startOfDay && 
               clockInDate < endOfDay;
      })
      .sort((a, b) => new Date(a.clockInTime).getTime() - new Date(b.clockInTime).getTime());
  }
}

// Storage factory that chooses between database and memory storage
function createStorage(): IStorage {
  // Always use memory storage for now - simpler and more reliable for deployment
  console.log('Using in-memory storage for reliable deployment');
  return new MemStorage();
}

export const storage = createStorage();
