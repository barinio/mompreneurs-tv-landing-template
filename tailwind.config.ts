import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/admin/**/*.{ts,tsx}',
    './components/admin/**/*.{ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
export default config
