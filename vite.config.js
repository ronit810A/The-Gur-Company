import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { createProductApiMiddleware } from './server.mjs'

function productApiPlugin(env) {
  return {
    name: 'gur-product-api',
    configureServer(server) {
      server.middlewares.use(createProductApiMiddleware({
        superAdminEmail: env.SUPER_ADMIN_EMAIL,
        superAdminPassword: env.SUPER_ADMIN_PASSWORD,
      }))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), productApiPlugin(env)],
  }
})
