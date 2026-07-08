import Head from "next/head";
import Link from "next/link";
import prisma from "@/lib/prisma";
import NoticeForm from "@/components/NoticeForm";

export async function getServerSideProps({ params }) {
  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return { notFound: true };
  }

  const notice = await prisma.notice.findUnique({ where: { id } });
  if (!notice) {
    return { notFound: true };
  }

  return {
    props: {
      notice: JSON.parse(JSON.stringify(notice)),
    },
  };
}

export default function EditNotice({ notice }) {
  return (
    <>
      <Head>
        <title>Edit notice · Notice Board</title>
      </Head>
      <div className="min-h-screen bg-board-bg">
        <header className="border-b border-board-line bg-board-panel">
          <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
            <Link href="/" className="text-sm text-board-muted hover:text-board-accent">
              ← Back to notices
            </Link>
            <h1 className="mt-1 text-xl font-semibold text-board-ink">Edit notice</h1>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
          <div className="rounded-xl border border-board-line bg-board-panel p-6 shadow-card">
            <NoticeForm mode="edit" initialNotice={notice} />
          </div>
        </main>
      </div>
    </>
  );
}
