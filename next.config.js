/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {
    // NEXT_PUBLIC_SERVER_URL: "https://fastfood-uz.herokuapp.com/api/",
    // NEXT_PUBLIC_SERVER_URL: "http://localhost:8080/api/",
    // NEXT_PUBLIC_SERVER_HOST_URL: "https://fastfood-uz.herokuapp.com"
    // NEXT_PUBLIC_SERVER_HOST_URL: "http://localhost:8080"
  // },
  images: {
    domains: ['fastfood-uz.herokuapp.com', "localhost"]
  }
}

module.exports = nextConfig
