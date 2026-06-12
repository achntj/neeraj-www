# Neeraj Jha Portfolio

Next.js portfolio for a sports media executive, author, and photographer. It includes an editorial homepage, about page, local Markdown blog, video embeds, and an interactive photo cloud inspired by `creativeapproa.ch`.

## Run locally

```bash
npm install --cache /tmp/neerajkjha-npm-cache
npm run dev
```

Open `http://localhost:3000`.

## Manage photographs

All gallery images are hosted locally in `public/images/gallery`. Each immediate subfolder becomes a gallery category automatically. Add, remove, or rename folders and images without editing a manifest; the server reads dimensions and builds the image cloud at compile time.

For better performance, export each image as JPG or WebP at roughly 1400-2000 px on the long edge and under 500 KB. Keep private originals outside `public`; only web-ready exports should be committed.

The homepage and About page use selected files from `personal`. Change their `src` values in `src/app/page.tsx` and `src/app/about/page.tsx` if different images should be featured.

## Manage blog posts

Posts are plain Markdown files in `content/blog`. Copy an existing file and update its front matter:

```md
---
title: "Article title"
excerpt: "One-sentence summary"
date: "2026-06-11"
category: "Media Rights"
---

Write the article here.
```

The filename becomes the URL slug, for example `my-article.md` becomes `/blog/my-article`.

The site publishes an RSS feed at `/rss.xml`. On pushes to `main`, the
`Publish newsletter` GitHub Action sends each newly added Markdown post to
Buttondown. Configure these repository settings before enabling it:

- Secret `BUTTONDOWN_API_KEY`: create this in Buttondown's API settings.
- Variable `SITE_URL`: the production origin, such as `https://example.com`.

Editing an existing post does not resend it. Buttondown email slugs match blog
slugs, which prevents a rerun from sending the same post twice.

## Free hosting

1. Push this folder to a GitHub repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Keep the detected Next.js defaults and select **Deploy**.

Vercel's free Hobby plan is sufficient for a personal portfolio. Because images are in `public`, no Cloudinary, S3, database, or paid image service is required. Cloudflare Pages or Netlify can also host the site using the standard Next.js integration.

## Before publishing

- Connect the newsletter form to Buttondown, Substack, Mailchimp, or another provider.
- Check role titles and dates against the final approved biography.
- Add a custom domain in the Vercel project settings.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
