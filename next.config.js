/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // SERVER_URL: "https://fastfood-uz.herokuapp.com/api/",
    SERVER_URL: "http://localhost:8080/api/",
    // SERVER_HOST_URL: "https://fastfood-uz.herokuapp.com"
    SERVER_HOST_URL: "http://localhost:8080"
  },
  images: {
    domains: ['fastfood-uz.herokuapp.com', "localhost"]
  }
}

module.exports = nextConfig
