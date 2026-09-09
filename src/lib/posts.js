import { getCollection } from 'astro:content';

/**
 * 발행된 글을 최신순으로 반환합니다.
 *
 * 배포된 사이트에서는 두 가지가 제외됩니다.
 *   1. draft: true       — 작성 중인 글
 *   2. pubDate 가 미래   — 예약 발행 대기 중인 글
 *
 * 로컬 개발(npm run dev)에서는 전부 보입니다. 미리보기용입니다.
 *
 * ⚠️ 예약 발행은 "빌드 시점"을 기준으로 판단합니다.
 *    날짜가 지나도 재빌드가 없으면 공개되지 않으므로,
 *    .github/workflows/daily-publish.yml 이 매일 재배포를 실행합니다.
 */
export async function getPosts() {
  const now = Date.now();

  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft && data.pubDate.valueOf() <= now : true
  );

  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
