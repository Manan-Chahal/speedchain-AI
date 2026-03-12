import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  company: varchar("company", { length: 255 }),
});

export const insertLeadSchema = createInsertSchema(leads, {
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  name: z.string().min(1, "Full name is required").max(255),
  company: z.string().min(1, "Company name is required").max(255),
}).omit({ id: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
