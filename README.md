# Priyansh Rawat's portfolio

Personal portfolio for Priyansh Rawat, a full-stack developer studying Computer Science and Physics at BITS Pilani, Goa Campus.

Features CabLite, Sitaram Seva Sansthan, its CMS, and Sarthi, with MDX engineering posts grounded in the project implementations and commit history.

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

Built with Next.js 16, React 19, TypeScript, Tailwind CSS, MDX, and Framer Motion. Import the repository into a Next.js-compatible host such as Vercel to deploy.

## Content

- `app/page.tsx`: introduction and social profiles
- `components/projects.tsx`: project cards and links
- `components/timeline.tsx`: experience and education
- `components/skills.tsx`: skills
- `data/*.mdx`: blog posts
- `public/priyansh-rawat-resume.pdf`: downloadable resume

Project impact figures and education details come from the supplied resume and are snapshots, not live counters. Project imagery comes from Priyansh's project assets; the CMS image is the original planning diagram.

## Integrations

GitHub activity uses public endpoints and does not require a token. Do not put a GitHub token in a `NEXT_PUBLIC_*` variable. GitHub's public rate limits may temporarily affect the activity section.

The contact form sends to `priyanshrawat888@gmail.com` through FormSubmit. The recipient must complete FormSubmit's activation flow before delivery can be relied on. No test message was sent during setup. Direct email is also available from the home-page social links.

## Template credit

The original design and template code are by [Ashutosh](https://github.com/Ashutoshx7/Portfoliov1), used with his permission. The layout, styling, and animations are retained. Portfolio content, project assets, and posts have been personalized for Priyansh Rawat.

This repository starts with a fresh history. No new license is asserted for the original template.
