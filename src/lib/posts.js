import { getCollection } from 'astro:content';

/**
 * 발행된 글을 최신순으로 반환합니다.
 * draft: true 인 글은 빌드(배포)에서만 제외되고, 로컬 개발 중에는 보입니다.
 */
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
