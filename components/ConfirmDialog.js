export default function ConfirmDialog({ open, title, description, onConfirm, onCancel, busy }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-board-ink/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-sm rounded-xl bg-board-panel p-6 shadow-xl">
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-board-ink">
          {title}
        </h2>
        <p className="mt-2 text-sm text-board-muted">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-lg border border-board-line px-4 py-2 text-sm font-medium text-board-ink hover:bg-board-bg disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="rounded-lg bg-urgent px-4 py-2 text-sm font-medium text-white hover:bg-urgent/90 disabled:opacity-50"
          >
            {busy ? "Deleting…" : "Delete notice"}
          </button>
        </div>
      </div>
    </div>
  );
}
