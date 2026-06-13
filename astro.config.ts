import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import remarkLinkCard, { type OgData } from 'remark-link-card-plus';

// https://astro.build/config
export default defineConfig({
  site: 'https://ose20.com',
  integrations: [mdx(), sitemap()],

  markdown: {
    // 単独行の URL を、ビルド時に OGP ベースのリンクカードへ変換する
    // ref: https://github.com/okaryo/remark-link-card-plus
    // Astro 標準の remarkPlugins に載せる形なら、Cloudflare Pages でも特別な依存解決がいらない
    remarkPlugins: [[
      remarkLinkCard, {
        cache: true,
        shortenUrl: true,
        thumbnailPosition: 'right',
        noThumbnail: false,
        noFavicon: false,
        ignoreExtensions: ['.mp4', '.pdf'],
        // ここで型引数がないと怒られるので .ts ファイルにした
        ogTransformer: (og: OgData, url: URL) => {
          if (url.hostname === 'github.com') {
            return { ...og, title: `GitHub: ${og.title}` };
          }
          if (og.title === og.description) {
            return { ...og, description: 'custom description' };
          }
          return og;
        }
      }
    ]],
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
});
