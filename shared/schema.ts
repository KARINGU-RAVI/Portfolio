import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolioSearches = pgTable("portfolio_searches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  query: text("query").notNull(),
  results: text("results").notNull(), // JSON string of search results
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertPortfolioSearchSchema = createInsertSchema(portfolioSearches).omit({
  id: true,
  timestamp: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  timestamp: true,
});

export type InsertPortfolioSearch = z.infer<typeof insertPortfolioSearchSchema>;
export type PortfolioSearch = typeof portfolioSearches.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
