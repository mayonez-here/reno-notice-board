import { useState } from "react";
import { useRouter } from "next/router";

const CATEGORIES = ["Exam", "Event", "General"];
const PRIORITIES = ["Normal", "Urgent"];

function toDateInputValue(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export default function NoticeForm({ mode, initialNotice }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    title: initialNotice?.title || "",
    body: initialNotice?.body || "",
    category: initialNotice?.category || "General",
    priority: initialNotice?.priority || "Normal",
    publishDate: toDateInputValue(initialNotice?.publishDate) || toDateInputValue(new Date()),
    image: initialNotice?.image || "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    setErrors({});

    try {
      const url = isEdit ? `/api/notices/${initialNotice.id}` : "/api/notices";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        if (payload.fields) setErrors(payload.fields);
        setFormError(payload.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push("/");
    } catch (err) {
      setFormError("Network error. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {formError && (
        <div className="rounded-lg border border-urgent/30 bg-urgent-soft px-4 py-3 text-sm text-urgent">
          {formError}
        </div>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-board-ink">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full rounded-lg border border-board-line px-3 py-2 text-sm focus:border-board-accent"
          placeholder="e.g. Mid-semester exam schedule released"
        />
        {errors.title && <p className="mt-1 text-xs text-urgent">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium text-board-ink">
          Body
        </label>
        <textarea
          id="body"
          value={form.body}
          onChange={(e) => update("body", e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-board-line px-3 py-2 text-sm focus:border-board-accent"
          placeholder="Full notice text visible to students and staff"
        />
        {errors.body && <p className="mt-1 text-xs text-urgent">{errors.body}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-board-ink">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full rounded-lg border border-board-line px-3 py-2 text-sm focus:border-board-accent"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-urgent">{errors.category}</p>}
        </div>

        <div>
          <span className="mb-1 block text-sm font-medium text-board-ink">Priority</span>
          <div className="flex gap-2">
            {PRIORITIES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => update("priority", p)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  form.priority === p
                    ? p === "Urgent"
                      ? "border-urgent bg-urgent-soft text-urgent"
                      : "border-board-accent bg-blue-50 text-board-accent"
                    : "border-board-line text-board-muted hover:bg-board-bg"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {errors.priority && <p className="mt-1 text-xs text-urgent">{errors.priority}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="publishDate" className="mb-1 block text-sm font-medium text-board-ink">
            Publish date
          </label>
          <input
            id="publishDate"
            type="date"
            value={form.publishDate}
            onChange={(e) => update("publishDate", e.target.value)}
            className="w-full rounded-lg border border-board-line px-3 py-2 text-sm focus:border-board-accent"
          />
          {errors.publishDate && <p className="mt-1 text-xs text-urgent">{errors.publishDate}</p>}
        </div>

        <div>
          <label htmlFor="image" className="mb-1 block text-sm font-medium text-board-ink">
            Image URL <span className="font-normal text-board-muted">(optional)</span>
          </label>
          <input
            id="image"
            type="url"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            className="w-full rounded-lg border border-board-line px-3 py-2 text-sm focus:border-board-accent"
            placeholder="https://…"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-lg border border-board-line px-4 py-2 text-sm font-medium text-board-ink hover:bg-board-bg"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-board-accent px-4 py-2 text-sm font-medium text-white hover:bg-board-accentDark disabled:opacity-50"
        >
          {submitting ? "Saving…" : isEdit ? "Save changes" : "Publish notice"}
        </button>
      </div>
    </form>
  );
}
