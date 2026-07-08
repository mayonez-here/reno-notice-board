# Notice Board — Reno Platforms Web Development Assignment

A Notice Board app with full create, read, update, and delete, built with Next.js (Pages Router), Prisma, and a hosted MySQL database.

## Tech stack

- **Framework:** Next.js 14, Pages Router
- **Database access:** Prisma
- **Database:** MySQL-compatible (TiDB Cloud free tier recommended; Neon/Supabase Postgres also work — change `provider` in `prisma/schema.prisma` to `postgresql`)
- **Styling:** Tailwind CSS

## Features

- List all notices as responsive cards, with **Edit** and **Delete** (delete requires confirmation).
- One form for both creating and editing a notice; the edit form loads the notice's current values.
- Fields: `title`, `body`, `category` (Exam / Event / General), `priority` (Normal / Urgent), `publishDate`, and an optional `image` URL.
- Create, update, and delete go through API routes under `pages/api/notices/`, using POST, PUT, and DELETE with appropriate status codes.
- Server-side validation in the API routes (`lib/validateNotice.js`) — required fields and a valid date are enforced on the server, not just in the browser.
- Urgent notices are always sorted above Normal ones with a visible red badge and pin icon. The ordering is done in the Prisma query (`orderBy`), not in the browser.

## Running locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up a free hosted database.** Recommended: [TiDB Cloud](https://tidbcloud.com) (MySQL-compatible, free Serverless tier). Neon or Supabase (Postgres) also work — if you use one of those, change `provider = "mysql"` to `provider = "postgresql"` in `prisma/schema.prisma`.

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Then paste your database connection string into `.env` as `DATABASE_URL`.

4. **Push the schema to your database**
   ```bash
   npx prisma db push
   ```

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).
   Live at: https://reno-notice-board-sigma.vercel.app/

## Deploying

1. Push this repo to a **public** GitHub repository.
2. Import it into [Vercel](https://vercel.com) (free Hobby tier).
3. Add the `DATABASE_URL` environment variable in the Vercel project settings.
4. Deploy. Vercel runs `prisma generate` automatically via the `postinstall` script in `package.json`.

## One thing I'd improve with more time

Add optimistic UI updates on the list page (show the deleted card disappearing or the new card appearing instantly, instead of waiting on a full server round-trip via `router.replace`), and swap the raw image-URL field for a real upload flow (e.g. to a free tier of Cloudinary or Vercel Blob) instead of asking for a hosted URL directly.

## Where and how AI was used

**AI's role:** Claude was used to scaffold the initial project — Next.js/Prisma setup, API routes, form and list components — based on the assignment brief.

**My contribution:** _Fill in once you've gone through the code — e.g.:_
- Reviewed and tested every API route and page against [your DB provider]
- Fixed: _anything you found broken or changed_
- Changed/rewrote: _styling, validation logic, field behavior, anything you customized_
- Set up the database, deployment, and verified create/edit/delete/persistence end to end myself

Keep this section specific and true to what you actually did — vague or inflated claims are easy for a reviewer to spot in a screen-share follow-up.


