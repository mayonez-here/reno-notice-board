import prisma from "@/lib/prisma";
import { validateNotice } from "@/lib/validateNotice";

export default async function handler(req, res) {
  const { id } = req.query;
  const noticeId = Number(id);

  if (!Number.isInteger(noticeId) || noticeId <= 0) {
    return res.status(400).json({ error: "Invalid notice id." });
  }

  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({ where: { id: noticeId } });
      if (!notice) return res.status(404).json({ error: "Notice not found." });
      return res.status(200).json(notice);
    } catch (err) {
      console.error(`GET /api/notices/${id} failed:`, err);
      return res.status(500).json({ error: "Could not load notice." });
    }
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    const { valid, errors, data } = validateNotice(req.body);
    if (!valid) {
      return res.status(400).json({ error: "Validation failed.", fields: errors });
    }

    try {
      const notice = await prisma.notice.update({ where: { id: noticeId }, data });
      return res.status(200).json(notice);
    } catch (err) {
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Notice not found." });
      }
      console.error(`PUT /api/notices/${id} failed:`, err);
      return res.status(500).json({ error: "Could not update notice." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({ where: { id: noticeId } });
      return res.status(204).end();
    } catch (err) {
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Notice not found." });
      }
      console.error(`DELETE /api/notices/${id} failed:`, err);
      return res.status(500).json({ error: "Could not delete notice." });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed.` });
}
