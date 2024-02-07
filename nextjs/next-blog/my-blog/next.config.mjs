import sass from 'sass'; // Dart Sass를 가져옵니다

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Sass/SCSS support 설정
  sassOptions: {
    implementation: sass, // Dart Sass를 사용하도록 설정
  },
};

// nextConfig를 내보냅니다.
export default nextConfig;