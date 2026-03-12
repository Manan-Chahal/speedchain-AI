import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertLeadSchema } from "@shared/schema";
import nodemailer from "nodemailer";

const NOTIFICATION_EMAIL = "Satyamsinghal@speedchain.io";

function createTransporter() {
  // Configure via environment variables; falls back to a dev-only test account
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Gmail shorthand (set GMAIL_USER + GMAIL_PASS in env)
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  return null;
}

async function sendLeadNotification(lead: { name?: string | null; email: string; company?: string | null }) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log("[Email] No SMTP config found — skipping email notification.");
    console.log("[Email] Lead details:", lead);
    return;
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.GMAIL_USER || "noreply@speedchain.io",
    to: NOTIFICATION_EMAIL,
    subject: `New Demo Request from ${lead.name || lead.email}`,
    html: `
      <h2 style="color:#0ea5e9;">New Demo Request — Speedchain AI</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:480px;">
        <tr style="background:#f1f5f9;">
          <td style="border:1px solid #e2e8f0;font-weight:bold;width:140px;">Full Name</td>
          <td style="border:1px solid #e2e8f0;">${lead.name || "—"}</td>
        </tr>
        <tr>
          <td style="border:1px solid #e2e8f0;font-weight:bold;">Work Email</td>
          <td style="border:1px solid #e2e8f0;">${lead.email}</td>
        </tr>
        <tr style="background:#f1f5f9;">
          <td style="border:1px solid #e2e8f0;font-weight:bold;">Company</td>
          <td style="border:1px solid #e2e8f0;">${lead.company || "—"}</td>
        </tr>
      </table>
      <p style="color:#64748b;font-size:12px;margin-top:16px;">Submitted via Speedchain AI landing page</p>
    `,
    text: `New Demo Request\n\nFull Name: ${lead.name || "—"}\nWork Email: ${lead.email}\nCompany: ${lead.company || "—"}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Email] Notification sent to ${NOTIFICATION_EMAIL}`);
  } catch (err) {
    console.error("[Email] Failed to send notification:", err);
    // Do not throw — email failure shouldn't block the lead save
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);

      // Fire-and-forget email notification
      sendLeadNotification(lead);

      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstIssue = error.issues[0];
        res.status(400).json({ message: firstIssue?.message || "Invalid lead data" });
      } else {
        console.error("[routes] Unexpected error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
