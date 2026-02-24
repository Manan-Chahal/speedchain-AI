/**
 * Vercel Serverless Function — wraps the Express API for deployment.
 * All routes under /api/* are handled here.
 */
import express, { type Request, Response, NextFunction } from "express";
import { z } from "zod";
import { insertLeadSchema } from "../shared/schema";
import { storage } from "../server/storage";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// POST /api/leads
app.post("/api/leads", async (req: Request, res: Response) => {
  try {
    const data = insertLeadSchema.parse(req.body);
    const lead = await storage.createLead(data);
    res.status(201).json(lead);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: "Invalid lead data" });
    } else {
      console.error("Error creating lead:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});

export default app;
