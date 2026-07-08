import prisma from "@/lib/prisma";
import { validateNotice } from "@/lib/validateNotice";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Urgent-first ordering happens in the database query itself, not in
      // the browser. The Priority enum is declared as [Normal, Urgent], so
      // Urgent has the higher ordinal and "desc" sorts it to the top;
      // publishDate is the secondary sort within each priority group.
      const notices = await prisma.notice.findMany({
        orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
      });
      return res.status(200).json(notices);
    } catch (err) {
      console.error("GET /api/notices failed:", err);
      return res.status(500).json({ error: "Could not load notices." });
    }
  }

  if (req.method === "POST") {
    const { valid, errors, data } = validateNotice(req.body);
    if (!valid) {
      return res.status(400).json({ error: "Validation failed.", fields: errors });
    }

    try {
      const notice = await prisma.notice.create({ data });
      return res.status(201).json(notice);
    } catch (err) {
      console.error("POST /api/notices failed:", err);
      return res.status(500).json({ error: "Could not create notice." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
