import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-board-bg px-4 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-board-muted">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-board-ink">This notice doesn't exist</h1>
      <p className="mt-2 text-sm text-board-muted">It may have been deleted, or the link is incorrect.</p>
      <Link href="/" className="mt-6 rounded-lg bg-board-accent px-4 py-2 text-sm font-medium text-white hover:bg-board-accentDark">
        Back to notices
      </Link>
    </div>
  );
}
