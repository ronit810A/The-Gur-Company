# The Gur Company

## Run locally

Install dependencies with `npm install`, then start the app:

```sh
Copy-Item .env.example .env
npm run dev
```

Before starting the app, set `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` in `.env`. Use a unique password with at least 12 characters. Open the Vite URL shown in the terminal and visit `/admin/login`; successful sign-in opens the dashboard at `/admin`.

The Vite dev server hosts the local Node product API, so there is no separate API process to start. Locally, products are stored in `data/products.json`. The dashboard and product write endpoints require the super-admin session. Active products appear automatically on their powder, block or syrup storefront page; draft products remain hidden from the storefront.

## Deploy on Vercel

The Vercel API uses Upstash Redis so login sessions and product changes persist across serverless requests.

1. Create an Upstash Redis database and copy its REST URL and REST token.
2. In Vercel **Project Settings → Environment Variables**, set `SUPER_ADMIN_EMAIL`, `SUPER_ADMIN_PASSWORD` (at least 12 characters), `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` for the environments you deploy.
3. Redeploy the project. `/api/*` is handled by the Vercel Node function; other routes keep the React single-page-app fallback.

Keep the Redis token and admin password in Vercel Environment Variables—never commit them to Git.

## Checks

```sh
npm run lint
npm run build
```
