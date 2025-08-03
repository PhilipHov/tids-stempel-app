import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, and, gte, lt, desc } from "drizzle-orm";
import { users, workSessions, type User, type WorkSession, type InsertUser, type InsertWorkSession } from "@shared/schema";
import type { IStorage } from "./storage";

class DatabaseStorage implements IStorage {
  private db: any;
  private isConnected: boolean = false;

  constructor() {
    try {
      const databaseUrl = process.env.DATABASE_URL;
      if (!databaseUrl) {
        console.warn("DATABASE_URL not found. Database operations will not be available.");
        this.isConnected = false;
        return;
      }

      const sql = neon(databaseUrl);
      this.db = drizzle(sql, { schema: { users, workSessions } });
      this.isConnected = true;
      console.log("Database connection established successfully.");
    } catch (error) {
      console.error("Failed to initialize database connection:", error);
      this.isConnected = false;
    }
  }

  private throwIfNotConnected() {
    if (!this.isConnected) {
      throw new Error("Database connection not available. Using fallback storage.");
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    this.throwIfNotConnected();
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    this.throwIfNotConnected();
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    this.throwIfNotConnected();
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  async getActiveWorkSession(userId: string): Promise<WorkSession | undefined> {
    this.throwIfNotConnected();
    const result = await this.db
      .select()
      .from(workSessions)
      .where(and(eq(workSessions.userId, userId), eq(workSessions.isActive, true)))
      .limit(1);
    return result[0];
  }

  async createWorkSession(session: InsertWorkSession): Promise<WorkSession> {
    this.throwIfNotConnected();
    const result = await this.db.insert(workSessions).values(session).returning();
    return result[0];
  }

  async clockOut(sessionId: string, clockOutTime: Date): Promise<WorkSession> {
    this.throwIfNotConnected();
    const result = await this.db
      .update(workSessions)
      .set({ clockOutTime, isActive: false })
      .where(eq(workSessions.id, sessionId))
      .returning();
    return result[0];
  }

  async getUserWorkSessions(userId: string, limit = 10): Promise<WorkSession[]> {
    this.throwIfNotConnected();
    return await this.db
      .select()
      .from(workSessions)
      .where(eq(workSessions.userId, userId))
      .orderBy(desc(workSessions.clockInTime))
      .limit(limit);
  }

  async getUserWorkSessionsForDate(userId: string, date: Date): Promise<WorkSession[]> {
    this.throwIfNotConnected();
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
    return await this.db
      .select()
      .from(workSessions)
      .where(
        and(
          eq(workSessions.userId, userId),
          gte(workSessions.clockInTime, startOfDay),
          lt(workSessions.clockInTime, endOfDay)
        )
      )
      .orderBy(workSessions.clockInTime);
  }

  get connected(): boolean {
    return this.isConnected;
  }
}

export { DatabaseStorage };