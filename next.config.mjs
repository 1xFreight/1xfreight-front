/** @type {import('next').NextConfig} */
import path from 'node:path';

export default {
    images: {
        domains: ['localhost'],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};
