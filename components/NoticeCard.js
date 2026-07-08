import Link from "next/link";

function formatDate(value) {
  const d = new Date(value);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

const CATEGORY_STYLES = {
  Exam: "bg-blue-50 text-blue-700",
  Event: "bg-emerald-50 text-emerald-700",
  General: "bg-board-bg text-board-muted",
};

export default function NoticeCard({ notice, onDeleteRequest }) {
  const isUrgent = notice.priority === "Urgent";

  return (
    <article
      className={`relative flex flex-col rounded-xl border bg-board-panel p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-md ${
        isUrgent ? "border-urgent/40" : "border-board-line"
      }`}
    >
      {isUrgent && (
        <span
          className="absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-urgent text-white shadow-pin"
          title="Urgent"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 2a5 5 0 0 0-5 5c0 2.1 1.2 3.4 2 4.3V15l-4 2v1h9v5l1-1 1 1v-5h1v-1l-4-2v-3.7c.8-.9 2-2.2 2-4.3a5 5 0 0 0-5-5Z" />
          </svg>
        </span>
      )}

      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_STYLES[notice.category] || CATEGORY_STYLES.General}`}>
            {notice.category}
          </span>
          {isUrgent && (
            <span className="rounded-full bg-urgent-soft px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-urgent">
              Urgent
            </span>
          )}
        </div>
        <time className="shrink-0 text-xs text-board-muted" dateTime={notice.publishDate}>
          {formatDate(notice.publishDate)}
        </time>
      </div>

      {notice.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={notice.image}
          alt=""
          className="mb-3 h-36 w-full rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <h3 className="text-base font-semibold text-board-ink">{notice.title}</h3>
      <p className="mt-1 flex-1 whitespace-pre-line text-sm text-board-muted line-clamp-4">{notice.body}</p>

      <div className="mt-4 flex justify-end gap-2 border-t border-board-line pt-3">
        <Link
          href={`/notices/${notice.id}/edit`}
          className="rounded-lg border border-board-line px-3 py-1.5 text-sm font-medium text-board-ink hover:bg-board-bg"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDeleteRequest(notice)}
          className="rounded-lg border border-urgent/30 px-3 py-1.5 text-sm font-medium text-urgent hover:bg-urgent-soft"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
