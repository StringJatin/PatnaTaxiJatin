/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "mixkit.imgix.net",
            "backend-taxi.onrender.com",
            "res.cloudinary.com",
            // Add other image domains here if needed
          ],},
    // Other Next.js configuration options, if needed
 
  
  experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
      config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
      }
      return config
  }
};

module.exports = nextConfig