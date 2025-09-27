import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Military Barracks
export const barracks = pgTable("barracks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  regiment: text("regiment").notNull(),
  region: text("region").notNull(),
});

// Personnel
export const personnel = pgTable("personnel", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rank: text("rank", { enum: ["SSG", "Befalingsmand", "Officer"] }).notNull(),
  barracksId: varchar("barracks_id").notNull().references(() => barracks.id),
  specialization: text("specialization").notNull(),
  experience: integer("experience").notNull(), // years
  status: text("status", { enum: ["Active", "Training", "Deployed", "On Leave"] }).notNull(),
  nextTraining: timestamp("next_training"),
  nextDeployment: timestamp("next_deployment"),
  dropoutRisk: integer("dropout_risk").notNull().default(0), // 0-100 percentage
});

// Resource Requirements
export const resourceRequirements = pgTable("resource_requirements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  barracksId: varchar("barracks_id").notNull().references(() => barracks.id),
  requiredSSG: integer("required_ssg").notNull(),
  requiredBefalingsmaend: integer("required_befalingsmaend").notNull(),
  requiredOfficerer: integer("required_officerer").notNull(),
  currentSSG: integer("current_ssg").notNull(),
  currentBefalingsmaend: integer("current_befalingsmaend").notNull(),
  currentOfficerer: integer("current_officerer").notNull(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

// Training Courses
export const trainingCourses = pgTable("training_courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type", { enum: ["Føringskursus", "Specialist", "Basic"] }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  participants: text("participants").notNull(), // JSON array of personnel IDs
  capacity: integer("capacity").notNull(),
  location: text("location").notNull(),
});

// Deployments
export const deployments = pgTable("deployments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  personnel: text("personnel").notNull(), // JSON array of personnel IDs
  status: text("status", { enum: ["Planned", "Active", "Completed"] }).notNull(),
});

// Schema exports
export const insertBarracksSchema = createInsertSchema(barracks).omit({
  id: true,
});

export const insertPersonnelSchema = createInsertSchema(personnel).omit({
  id: true,
});

export const insertResourceRequirementsSchema = createInsertSchema(resourceRequirements).omit({
  id: true,
});

export const insertTrainingCourseSchema = createInsertSchema(trainingCourses).omit({
  id: true,
});

export const insertDeploymentSchema = createInsertSchema(deployments).omit({
  id: true,
});

// Type exports
export type InsertBarracks = z.infer<typeof insertBarracksSchema>;
export type Barracks = typeof barracks.$inferSelect;
export type InsertPersonnel = z.infer<typeof insertPersonnelSchema>;
export type Personnel = typeof personnel.$inferSelect;
export type InsertResourceRequirements = z.infer<typeof insertResourceRequirementsSchema>;
export type ResourceRequirements = typeof resourceRequirements.$inferSelect;
export type InsertTrainingCourse = z.infer<typeof insertTrainingCourseSchema>;
export type TrainingCourse = typeof trainingCourses.$inferSelect;
export type InsertDeployment = z.infer<typeof insertDeploymentSchema>;
export type Deployment = typeof deployments.$inferSelect;
