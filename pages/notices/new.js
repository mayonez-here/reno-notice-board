import Head from "next/head";
import Link from "next/link";
import NoticeForm from "@/components/NoticeForm";

export default function NewNotice() {
  return (
    <>
      <Head>
        <title>New notice · Notice Board</title>
      </Head>
      <div className="min-h-screen bg-board-bg">
        <header className="border-b border-board-line bg-board-panel">
          <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
            <Link href="/" className="text-sm text-board-muted hover:text-board-accent">
              ← Back to notices
            </Link>
            <h1 className="mt-1 text-xl font-semibold text-board-ink">New notice</h1>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
          <div className="rounded-xl border border-board-line bg-board-panel p-6 shadow-card">
            <NoticeForm mode="create" />
          </div>
        </main>
      </div>
    </>
  );
}
