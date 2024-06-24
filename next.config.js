const path = require("path");
// 
/**
* @type {import('next').NextConfig}
*/
module.exports = {
  reactStrictMode: false, 
  images: {
    unoptimized: true,
    domains: ['127.0.0.1:3000'],
  },
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  }, 
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
};