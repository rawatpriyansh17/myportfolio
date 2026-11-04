# Portfolio

A personal portfolio with project pages, MDX engineering articles, light and dark themes, an animated landscape, and a keyboard command menu.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 and Tailwind Typography
- MDX with `next-mdx-remote` and `gray-matter`
- Radix UI, cmdk, next-themes, Motion
- Lucide interface icons and Simple Icons for brands
- Geist, Geist Mono, and Doto via `next/font`
- Vercel Analytics and Speed Insights

## Development

```sh
npm ci
npm run dev
```

```sh
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Content and structure

- `app/page.tsx`: home layout, introduction, and social links
- `components/ExperienceList.tsx`: expandable work experience
- `data/projectsData.ts`: shared project content, technologies, and icons
- `app/projects/[slug]/page.tsx`: statically generated project details
- `data/*.mdx`: articles with title, description, date, tags, and cover image
- `util/mdx_clean.ts`: frontmatter parsing, reading time, and heading anchors
- `app/blog/[slug]/page.tsx`: article layout, contents, and related reading
- `components/BannerParticles.tsx`: canvas leaf animation
- `components/CurrentTime.tsx`: live local clock
- `public/projects/` and `public/blog-images/`: project and editorial covers
- `app/icon.png`, `app/favicon.ico`, and `app/*image.jpg`: favicon and social preview assets

Contact uses a direct email link. No contact backend or calendar integration is required.

## Deployment

Use npm for installs; `package-lock.json` is the single dependency lockfile. Vercel detects Next.js automatically and uses `npm ci` followed by `npm run build`.

Deploy to a Next.js-compatible host. Vercel supplies the production hostname automatically. On other hosts, set `NEXT_PUBLIC_SITE_URL` to the public origin so social image URLs resolve correctly; see `.env.example`.

Project and blog pages are generated at build time. Commit new MDX or content changes and rebuild to publish them.

## Daily content

The homepage uses hourly incremental static regeneration. Its quote is selected from `data/daily-quotes.ts` by the calendar date in Asia/Kolkata, so everyone sees the same quote and repeated refreshes do not skip ahead. Each quote links to its source. The curated collection repeats after one complete rotation.

Vercel runs `/api/cron/daily-quote` daily at `18:30 UTC` (midnight in India). Set a private `CRON_SECRET` of at least 32 characters in the production environment. The route accepts only Vercel's matching bearer token and invalidates the homepage for regeneration on its next visit. Hobby cron timing can vary within the scheduled hour; hourly revalidation also keeps the quote changing if a run is missed. No daily commits, database, or external quote API are needed. Cron jobs run only in production.

The GitHub calendar fetches public contribution counts for `rawatpriyansh17` through the [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api), with an hourly cache and an unavailable state if the service fails. It contains no pull-request or commit feed and needs no GitHub token.

Run the date-boundary and rotation checks with `node --experimental-strip-types --test tests/*.test.mjs`.
