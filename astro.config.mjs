import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/consts.js';

export default defineConfig({
  // ⚠️ 도메인을 구입하면 src/consts.js 의 SITE.url 을 실제 도메인으로 바꾸세요.
  //    sitemap.xml 과 canonical 태그가 이 값을 기준으로 생성됩니다.
  site: SITE.url,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
