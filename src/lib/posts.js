import { getCollection } from 'astro:content';

/** 한국 표준시(KST)는 UTC+9 */
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

/**
 * 발행된 글을 최신순으로 반환합니다.
 *
 * 배포된 사이트에서는 두 가지가 제외됩니다.
 *   1. draft: true       — 작성 중인 글
 *   2. 아직 공개 시각이 안 된 글
 *
 * 로컬 개발(npm run dev)에서는 전부 보입니다. 미리보기용입니다.
 *
 * ── 공개 시각 기준 ───────────────────────────────────────────
 * 프론트매터의 `pubDate: 2026-10-04` 는 UTC 자정(09:00 KST)으로 해석됩니다.
 * 그대로 쓰면 "10월 4일 글"이 한국시간 오전 9시에야 공개되고,
 * 자정~오전 9시 사이에 빌드가 돌면 글이 빠집니다.
 *
 * 실제로 2026-10-04 00:07 KST 에 배포가 돌았을 때 그날 글이 누락됐습니다.
 * (배포는 성공했지만 UTC 기준으로는 아직 10/03 이라 필터에서 걸러짐)
 *
 * 그래서 9시간을 당겨 **한국시간 자정**을 공개 기준으로 삼습니다.
 *   pubDate: 2026-10-04  →  2026-10-04 00:00 KST 부터 공개
 * ─────────────────────────────────────────────────────────────
 */
export async function getPosts() {
  const now = Date.now();

  const posts = await getCollection('blog', ({ data }) => {
    if (!import.meta.env.PROD) return true;
    if (data.draft) return false;

    const publishAt = data.pubDate.valueOf() - KST_OFFSET_MS;
    return publishAt <= now;
  });

  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
