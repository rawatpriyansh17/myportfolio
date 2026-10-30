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

Deploy to a Next.js-compatible host. Vercel supplies the production hostname automatically. On other hosts, set `NEXT_PUBLIC_SITE_URL` to the public origin so social image URLs resolve correctly; see `.env.example`.

Project and blog pages are generated at build time. Commit new MDX or content changes and rebuild to publish them.
