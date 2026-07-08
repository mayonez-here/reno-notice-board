import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import prisma from "@/lib/prisma";
import NoticeCard from "@/components/NoticeCard";
import ConfirmDialog from "@/components/ConfirmDialog";

export async function getServerSideProps() {
  // Urgent-first ordering is done here, in the Prisma query, not by
  // sorting an array in the browser. Priority is declared as [Normal, Urgent]
  // in schema.prisma, so Urgent has the higher ordinal and sorts first on "desc".
  const notices = await prisma.notice.findMany({
    orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
  });

  return {
    props: {
      notices: JSON.parse(JSON.stringify(notices)),
    },
  };
}

export default function Home({ notices }) {
  const router = useRouter();
  const [target, setTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function confirmDelete() {
    if (!target) return;
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/notices/${target.id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        throw new Error("Delete failed");
      }
      setTarget(null);
      router.replace(router.asPath);
    } catch (err) {
      setError("Could not delete this notice. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Notice Board · Reno Platforms</title>
      </Head>
      <div className="min-h-screen bg-board-bg">
        <header className="border-b border-board-line bg-board-panel">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h1 className="text-xl font-semibold text-board-ink">Notice Board</h1>
              <p className="text-sm text-board-muted">Exams, events, and general announcements in one place.</p>
            </div>
            <Link
              href="/notices/new"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-board-accent px-4 py-2 text-sm font-medium text-white hover:bg-board-accentDark"
            >
              + New notice
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {error && (
            <div className="mb-4 rounded-lg border border-urgent/30 bg-urgent-soft px-4 py-3 text-sm text-urgent">
              {error}
            </div>
          )}

          {notices.length === 0 ? (
            <div className="rounded-xl border border-dashed border-board-line bg-board-panel py-16 text-center">
              <p className="text-sm text-board-muted">No notices yet.</p>
              <Link href="/notices/new" className="mt-2 inline-block text-sm font-medium text-board-accent hover:underline">
                Post the first one
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-3">
              {notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} onDeleteRequest={setTarget} />
              ))}
            </div>
          )}
        </main>
      </div>

      <ConfirmDialog
        open={!!target}
        title="Delete this notice?"
        description={target ? `"${target.title}" will be permanently removed. This can't be undone.` : ""}
        onConfirm={confirmDelete}
        onCancel={() => setTarget(null)}
        busy={deleting}
      />
    </>
  );
}
