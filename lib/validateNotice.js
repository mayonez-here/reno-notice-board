const CATEGORIES = ["Exam", "Event", "General"];
const PRIORITIES = ["Normal", "Urgent"];

// Runs on the server inside the API routes. Returns { valid, errors, data }.
// `data` holds the cleaned values ready to hand to Prisma when valid is true.
export function validateNotice(body) {
  const errors = {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const noticeBody = typeof body.body === "string" ? body.body.trim() : "";
  const category = body.category;
  const priority = body.priority;
  const publishDateRaw = body.publishDate;
  const image = typeof body.image === "string" ? body.image.trim() : "";

  if (!title) errors.title = "Title is required.";
  if (!noticeBody) errors.body = "Body is required.";
  if (!CATEGORIES.includes(category)) errors.category = "Category must be Exam, Event, or General.";
  if (!PRIORITIES.includes(priority)) errors.priority = "Priority must be Normal or Urgent.";

  let publishDate = null;
  if (!publishDateRaw) {
    errors.publishDate = "Publish date is required.";
  } else {
    const parsed = new Date(publishDateRaw);
    if (Number.isNaN(parsed.getTime())) {
      errors.publishDate = "Publish date is not a valid date.";
    } else {
      publishDate = parsed;
    }
  }

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
    data: valid
      ? {
          title,
          body: noticeBody,
          category,
          priority,
          publishDate,
          image: image || null,
        }
      : null,
  };
}
