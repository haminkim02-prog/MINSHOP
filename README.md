# 향수 블로그 (Astro)

AdSense 심사 요건에 맞춰 세팅된 정적 블로그입니다. 글은 마크다운으로 쓰고, 빌드하면 순수 HTML이 나옵니다. 호스팅은 Vercel 무료 플랜으로 충분합니다.

---

## 0. 먼저 Node.js를 설치하세요

이 컴퓨터에 Node.js가 없습니다. Astro를 실행하려면 필요합니다.

1. <https://nodejs.org> 접속
2. **LTS** 버전 다운로드 (`.msi`)
3. 설치 후 **터미널을 완전히 새로 열어야** 인식됩니다

확인:

```bash
node -v
```

`v20.x` 이상이 나오면 됩니다.

---

## 1. 실행

프로젝트 폴더에서 처음 한 번만:

```bash
npm install
```

개발 서버 실행:

```bash
npm run dev
```

<http://localhost:4321> 에서 확인할 수 있습니다. 파일을 저장하면 브라우저가 자동으로 갱신됩니다.

배포용 빌드 (배포 전 오류 확인용):

```bash
npm run build
```

---

## 2. 가장 먼저 고쳐야 할 것 — `src/consts.js`

사이트 전체 설정이 이 파일 하나에 모여 있습니다. **다른 걸 하기 전에 여기부터** 채우세요.

| 항목 | 설명 |
| --- | --- |
| `SITE.title` | 사이트 이름. 지금은 `향의 기록` 으로 되어 있습니다 |
| `SITE.description` | 한 줄 소개. 검색결과에 표시됩니다 |
| `SITE.url` | **도메인 구입 후 실제 주소로 바꾸세요.** sitemap과 canonical이 이 값을 씁니다 |
| `SITE.email` | **반드시 실제 이메일로.** AdSense 심사에 연락 수단이 필요합니다 |
| `SITE.author` | 저자명 또는 닉네임 |
| `ADSENSE.client` | 승인 후 `ca-pub-...` 를 넣으면 광고가 자동으로 붙습니다 |
| `GA4_ID` | Google Analytics 측정 ID (`G-...`) |
| `CATEGORIES` | 카테고리 목록. 추가·수정 가능 |

`SITE.url` 을 바꾸면 `public/robots.txt` 의 Sitemap 주소도 같이 바꿔야 합니다.

---

## 3. 글 쓰는 방법

`src/content/blog/` 안에 `.md` 파일을 만들면 글이 됩니다.

**파일 이름이 그대로 주소가 됩니다.**

```
src/content/blog/blue-de-chanel-edp.md  →  /blog/blue-de-chanel-edp/
```

파일명은 **영문 소문자 + 하이픈**만 쓰세요. 한글 파일명은 주소가 깨집니다.

### 템플릿을 복사해서 쓰세요

| 파일 | 용도 |
| --- | --- |
| `_template-review.md` | 단품 리뷰 (지속력 시간별 표 포함) |
| `_template-recommend.md` | 추천·비교 리스트 |
| `perfume-concentration.md` | 완성된 글 예시 (그대로 발행 가능) |

`_` 로 시작하는 파일도 목록에 나타나므로, 템플릿은 `draft: true` 로 두었습니다.

### 프론트매터 (글 맨 위 설정)

```markdown
---
title: '블루 드 샤넬 EDP 리뷰 — 지속력 시간별 기록'
description: '검색결과에 나오는 요약문. 80~150자. 타겟 키워드를 자연스럽게 넣으세요.'
pubDate: 2026-09-10
category: 'review'
tags: ['샤넬', '우디']
draft: false
---
```

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| `title` | ✅ | 검색결과 제목. **타겟 키워드를 앞쪽에** 두세요 |
| `description` | ✅ | 검색결과 요약문 |
| `pubDate` | ✅ | `YYYY-MM-DD` |
| `category` | ✅ | `review` / `recommend` / `guide` / `book` 중 하나 |
| `updatedDate` | | 글을 갱신했을 때. 검색엔진이 신선도로 봅니다 |
| `tags` | | 배열 |
| `heroImage` | | `/images/파일명.jpg` (public 폴더 기준) |
| `draft` | | `true` 면 배포에서 제외. 개발 서버에서는 보입니다 |

### 이미지

`public/images/` 폴더를 만들어 넣고 이렇게 참조합니다.

```markdown
![블루 드 샤넬 병 사진](/images/blue-de-chanel-01.jpg)
```

**직접 찍은 사진만 쓰세요.** 스톡 이미지는 순위에 도움이 안 되고, 저작권 문제도 생깁니다. 업로드 전에 이미지 크기를 1600px 이하로 줄이면 페이지 속도가 좋아집니다 (속도는 검색 순위에 직접 영향).

---

## 4. 배포 (Vercel, 무료)

### 4-1. GitHub에 올리기

```bash
git init
git add .
git commit -m "첫 커밋"
```

GitHub에서 새 저장소를 만든 뒤:

```bash
git remote add origin https://github.com/사용자명/저장소명.git
git branch -M main
git push -u origin main
```

> 저장소는 **Private으로 만들어도** Vercel 배포가 됩니다.

### 4-2. Vercel 연결

1. <https://vercel.com> 에서 GitHub 계정으로 로그인
2. **Add New → Project** → 저장소 선택
3. Framework Preset이 **Astro** 로 자동 인식됩니다. 그대로 Deploy
4. 1~2분 뒤 `xxx.vercel.app` 주소가 생깁니다

이후로는 `git push` 만 하면 자동으로 재배포됩니다.

### 4-3. 도메인 연결

1. 도메인 구입 (가비아, Cloudflare Registrar 등 / 연 1~2만원)
2. Vercel 프로젝트 → **Settings → Domains** → 도메인 입력
3. Vercel이 안내하는 DNS 레코드를 도메인 관리 페이지에 등록
4. `src/consts.js` 의 `SITE.url` 과 `public/robots.txt` 의 Sitemap 주소를 실제 도메인으로 수정 → 커밋 → push

HTTPS는 Vercel이 자동으로 붙여줍니다.

---

## 5. AdSense 신청 순서

**글 25~30편을 먼저 쌓으세요.** 콘텐츠가 부족하면 무조건 거절됩니다.

### 신청 전 체크리스트

- [ ] 글 25편 이상, 각 1,500자 이상
- [ ] 전부 직접 쓴 오리지널 콘텐츠
- [ ] 자체 도메인 연결 완료 (`.vercel.app` 주소로도 신청은 되지만 자체 도메인이 유리)
- [ ] `src/consts.js` 의 `SITE.email` 이 실제 주소
- [ ] `/about/` 에 본인 소개를 실제로 작성 (`[ ]` 부분 전부 채우기)
- [ ] `/contact/` 의 이메일이 실제로 받을 수 있는 주소
- [ ] `/privacy/` 의 `[ ]` 부분 전부 채우기
- [ ] 깨진 링크·빈 카테고리 없음
- [ ] 모바일에서 확인 완료

### 신청

1. <https://adsense.google.com> → 사이트 주소·구글 계정·주소 입력
2. AdSense가 주는 확인 코드를 넣어야 합니다 → `src/consts.js` 의 `ADSENSE.client` 에 `ca-pub-...` 를 채우면 `<head>` 에 자동 삽입됩니다 → 커밋 후 push
3. 심사 대기 (보통 1~14일)

### 승인 후 바로 할 일

1. **`public/ads.txt` 채우기** — AdSense가 보여주는 한 줄을 그대로 붙여넣으세요. 비어 있으면 "수익 손실 위험" 경고가 뜨고 단가가 떨어집니다
2. `ADSENSE.autoAds` 를 `true` 로 두고 자동 광고로 시작
3. 데이터가 쌓이면 광고 단위를 만들어 `ADSENSE.slots` 에 슬롯 번호를 넣고 수동 배치로 전환

### 계정이 영구 정지되는 행위 — 절대 금지

- 본인이 자기 광고 클릭
- "광고를 클릭해주세요" 같은 클릭 유도
- 광고를 콘텐츠처럼 위장해서 배치
- 지인에게 클릭 부탁

한 번 정지되면 되돌릴 수 없습니다.

---

## 6. 검색엔진 등록 (승인과 별개로 꼭 하세요)

| 서비스 | 주소 | 하는 일 |
| --- | --- | --- |
| Google Search Console | search.google.com/search-console | 사이트 등록 + `sitemap-index.xml` 제출 |
| 네이버 서치어드바이저 | searchadvisor.naver.com | 네이버 검색 노출 |
| Bing 웹마스터 도구 | bing.com/webmasters | Bing·AI 검색 노출 |

사이트맵 주소는 `https://도메인/sitemap-index.xml` 입니다 (자동 생성됩니다).

Search Console은 **어떤 검색어로 들어오는지** 보여줍니다. 이 데이터가 다음에 쓸 글을 알려주므로, 초기부터 반드시 등록하세요.

---

## 7. 폴더 구조

```
perfume-blog/
├─ src/
│  ├─ consts.js           ★ 사이트 설정 — 여기부터 고치세요
│  ├─ content.config.ts   글 프론트매터 규칙
│  ├─ content/blog/       ★ 글이 들어가는 곳 (.md)
│  ├─ pages/
│  │  ├─ index.astro      홈
│  │  ├─ blog/            글 목록 + 글 상세
│  │  ├─ category/        카테고리별 목록
│  │  ├─ about.astro      소개      (AdSense 필수)
│  │  ├─ contact.astro    문의      (AdSense 필수)
│  │  ├─ privacy.astro    개인정보처리방침 (AdSense 필수)
│  │  ├─ 404.astro
│  │  └─ rss.xml.js       RSS 피드
│  ├─ components/
│  │  ├─ BaseHead.astro   SEO 메타 + AdSense/GA 스크립트
│  │  ├─ AdSlot.astro     광고 자리
│  │  └─ ...
│  ├─ layouts/
│  └─ styles/global.css   전체 디자인 (색상은 맨 위 토큰에서)
├─ public/
│  ├─ robots.txt          ★ 도메인 변경 시 수정
│  ├─ ads.txt             ★ AdSense 승인 후 채우기
│  └─ favicon.svg
└─ astro.config.mjs
```

---

## 8. 자주 막히는 곳

**`npm run dev` 가 안 됨** — 터미널을 새로 열었는지 확인하세요. Node 설치 후에는 기존 터미널이 인식하지 못합니다.

**글이 목록에 안 나옴** — `draft: true` 인지 확인하세요. 그리고 `category` 값이 `consts.js` 의 slug와 정확히 같아야 합니다.

**빌드 에러: `Invalid frontmatter`** — 날짜 형식(`2026-09-10`), 따옴표 짝, `category` 값을 확인하세요. 제목에 콜론(`:`)이 있으면 반드시 따옴표로 감싸야 합니다.

**주소에 한글이 들어감** — 파일명을 영문으로 바꾸세요.

**색을 바꾸고 싶음** — `src/styles/global.css` 맨 위 `:root` 의 `--accent` 등을 수정하세요. 다크모드 값도 같이 바꿔야 합니다.
