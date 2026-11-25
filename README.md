# The Gur Company

## Run locally

Install dependencies with `npm install`, then start the app:

```sh
Copy-Item .env.example .env
npm run dev
```

Before starting the app, set `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` in `.env`. Use a unique password with at least 12 characters. Open the Vite URL shown in the terminal and visit `/admin/login`; successful sign-in opens the dashboard at `/admin`.

The Vite dev server also hosts the Node product API, so there is no separate API process or proxy port to start. The dashboard and product write endpoints require the super-admin session. Products are stored in `data/products.json`. Active products appear automatically on their powder, block or syrup storefront page; draft products remain hidden from the storefront.

This JSON-file storage is intended for local development and is not a persistent database for a serverless deployment.

## Checks

```sh
npm run lint
npm run build
```
