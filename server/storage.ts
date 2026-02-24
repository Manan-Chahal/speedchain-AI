import { leads, type Lead, type InsertLead } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const { db } = await import("./db");
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }
}

export class MemoryStorage implements IStorage {
  private leads: Lead[] = [];
  private nextId = 1;

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const lead: Lead = {
      id: this.nextId++,
      email: insertLead.email,
      name: insertLead.name ?? null,
      company: insertLead.company ?? null,
    };
    this.leads.push(lead);
    console.log("[MemoryStorage] Lead saved:", lead);
    return lead;
  }
}

// Use in-memory storage if no DATABASE_URL is set
export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemoryStorage();
