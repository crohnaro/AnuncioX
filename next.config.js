/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: 'mongodb+srv://vinicioscararine95:JyxZp55oaVUkrOXp@cluster0.3pfo9yd.mongodb.net/test'
  },
  staticPageGenerationTimeout: 1000,
  rules: { 'ESLint': 'off' },
}

module.exports = nextConfig
