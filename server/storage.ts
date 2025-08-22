import { type PortfolioSearch, type InsertPortfolioSearch, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  savePortfolioSearch(search: InsertPortfolioSearch): Promise<PortfolioSearch>;
  saveContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getRecentSearches(limit?: number): Promise<PortfolioSearch[]>;
}

export class MemStorage implements IStorage {
  private portfolioSearches: Map<string, PortfolioSearch>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.portfolioSearches = new Map();
    this.contactMessages = new Map();
  }

  async savePortfolioSearch(insertSearch: InsertPortfolioSearch): Promise<PortfolioSearch> {
    const id = randomUUID();
    const search: PortfolioSearch = {
      ...insertSearch,
      id,
      timestamp: new Date(),
    };
    this.portfolioSearches.set(id, search);
    return search;
  }

  async saveContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getRecentSearches(limit = 10): Promise<PortfolioSearch[]> {
    return Array.from(this.portfolioSearches.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
