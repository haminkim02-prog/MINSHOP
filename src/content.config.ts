import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    // 글 제목 — 검색결과에 그대로 나갑니다. 타겟 키워드를 앞쪽에 두세요.
    title: z.string(),
    // 메타 설명 — 검색결과 요약문. 80~150자 권장.
    description: z.string(),
    // 발행일 (YYYY-MM-DD)
    pubDate: z.coerce.date(),
    // 수정일 (선택) — 글을 갱신하면 넣어주세요. 검색엔진이 신선도로 봅니다.
    updatedDate: z.coerce.date().optional(),
    // 카테고리 — consts.js 의 CATEGORIES slug 중 하나
    category: z.enum(['review', 'recommend', 'guide', 'book']),
    // 태그 (선택)
    tags: z.array(z.string()).default([]),
    // 대표 이미지 경로 (선택) — public 폴더 기준. 예: '/images/blue-de-chanel.jpg'
    heroImage: z.string().optional(),
    // true 로 두면 빌드에서 제외됩니다. 작성 중인 글에 사용하세요.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
