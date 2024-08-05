import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles'), 'src/styles/variables.scss'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dxsqdqnoe/image/upload/**',
            },
            {
                protocol: 'https',
                hostname: 'sialo.vercel.app',
                port: '',
                pathname: '/_next/**',
            },
        ],
    },
    env: {
        SECRET_KEY: 'sialo_frontend',
    },
};

export default nextConfig;
