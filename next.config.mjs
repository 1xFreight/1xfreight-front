/** @type {import('next').NextConfig} */
import path from 'node:path';

export default {
    images: {
        domains: ['localhost','srv505914.hstgr.cloud','154.38.181.45'],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    eslint:{
        ignoreDuringBuilds: true,
    },
    typescript:{
        ignoreBuildErrors:true
    },

};
