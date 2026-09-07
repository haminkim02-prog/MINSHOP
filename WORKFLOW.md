# 글 쓰고 올리는 방법

```
① 파일 수정  →  ② GitHub에 올림  →  ③ Vercel 자동 배포 (1~2분)
                                        ↑ 손댈 것 없음
```

**③은 자동입니다.** GitHub에 올라가는 순간 Vercel이 알아서 빌드하고 배포합니다.
Vercel이나 가비아 화면을 다시 열 일은 없습니다.

---

## 방법 A — GitHub 웹에서 직접 (가장 쉬움, 설치 불필요)

컴퓨터에 아무것도 없어도 됩니다. 브라우저만 있으면 됩니다.
**외출 중이거나 다른 컴퓨터에서도** 글을 고칠 수 있습니다.

### 기존 글 수정

1. <https://github.com/haminkim02-prog/MINSHOP> 접속
2. `src` → `content` → `blog` 폴더로 이동
3. 고칠 파일 클릭 (예: `perfume-notes.md`)
4. 오른쪽 위 **연필 아이콘(✏️)** 클릭
5. 내용 수정
6. 아래로 스크롤 → **Commit changes** 클릭
7. 끝. 1~2분 뒤 사이트에 반영됩니다

### 새 글 쓰기

1. `src/content/blog` 폴더에서 **Add file → Create new file**
2. 파일명 입력 — **영문 소문자와 하이픈만** (예: `blue-de-chanel.md`)
   - 이 파일명이 그대로 주소가 됩니다 → `/blog/blue-de-chanel/`
3. 맨 위에 프론트매터를 넣고 본문 작성 (아래 양식 참고)
4. **Commit changes**

---

## 방법 B — 내 컴퓨터에서 (미리보기 가능)

발행 전에 실제 화면을 보고 싶을 때 이 방법을 씁니다.

### 폴더 위치

```
C:\Users\김하은\Desktop\claude\perfume-blog\src\content\blog\
```

이 안의 `.md` 파일이 글입니다. **메모장, VS Code 등 아무 편집기**로 열면 됩니다.

### 미리보기

터미널(PowerShell)에서:

```
cd C:\Users\김하은\Desktop\claude\perfume-blog
npm run dev
```

<http://localhost:4321> 에서 확인. 파일을 저장하면 브라우저가 자동으로 갱신됩니다.
끄려면 터미널에서 `Ctrl + C`.

### 배포

```
npm run deploy
```

이 한 줄이 `git add` → `commit` → `push`를 모두 실행합니다.
1~2분 뒤 사이트에 반영됩니다.

> 커밋 메시지를 따로 남기고 싶으면:
> ```
> git add -A
> git commit -m "블루 드 샤넬 리뷰 추가"
> git push
> ```

---

## 방법 C — Claude에게 시키기

Claude Code를 이 폴더에서 열고 "○○ 글 고쳐줘" / "새 글 써줘"라고 하면
파일 수정부터 배포까지 처리합니다.

---

## 글 양식 (프론트매터)

모든 `.md` 파일은 맨 위에 이 블록이 있어야 합니다.

```markdown
---
title: '블루 드 샤넬 EDP 리뷰 — 지속력 시간별 기록'
description: '검색결과에 나오는 요약문. 80~150자.'
pubDate: 2026-09-10
category: 'review'
tags: ['샤넬', '우디']
draft: false
---

여기부터 본문입니다.

## 소제목

내용...
```

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| `title` | ✅ | 검색결과 제목. **타겟 키워드를 앞쪽에** |
| `description` | ✅ | 검색결과 요약문 |
| `pubDate` | ✅ | `YYYY-MM-DD` |
| `category` | ✅ | `review` / `recommend` / `guide` / `book` 중 하나 |
| `updatedDate` | | 글을 고쳤을 때. 검색엔진이 신선도로 봅니다 |
| `tags` | | `['태그1', '태그2']` |
| `heroImage` | | `/images/파일명.jpg` |
| `draft` | | `true`면 배포 안 됨 (작성 중인 글) |

**템플릿을 복사해서 쓰세요.**

- `_template-review.md` — 단품 리뷰 (지속력 시간별 표 포함)
- `_template-recommend.md` — 추천·비교 리스트

---

## 이미지 넣기

1. `public/images/` 폴더에 사진을 넣습니다 (없으면 폴더를 만드세요)
2. 글에서 이렇게 참조합니다

```markdown
![블루 드 샤넬 병 사진](/images/blue-de-chanel-01.jpg)
```

- **직접 찍은 사진만** 쓰세요
- 업로드 전에 가로 1600px 이하로 줄이면 페이지가 빨라집니다 (속도는 검색 순위에 영향)
- 파일명도 영문 소문자 + 하이픈

---

## 배포 확인

- **사이트** <https://www.minlnim.store>
- **배포 상태** <https://vercel.com> → minshop → Deployments
  - 초록 `Ready` = 성공
  - 빨간 `Error` = 빌드 실패. 클릭하면 원인이 나옵니다

---

## 자주 나는 오류

| 증상 | 원인 |
| --- | --- |
| 글이 사이트에 안 보임 | `draft: true`로 되어 있음 |
| 빌드 실패 `Invalid frontmatter` | 날짜 형식, 따옴표 짝, `category` 값 확인 |
| 제목에 콜론(`:`)을 썼더니 실패 | 제목 전체를 따옴표로 감싸세요 |
| 주소가 깨짐 | 파일명에 한글·공백이 들어감 → 영문 소문자+하이픈으로 |
| 카테고리 페이지에 안 나옴 | `category` 값 오타 (`review`/`recommend`/`guide`/`book`) |

---

## 사이트 설정 바꾸기

사이트 이름, 소개글, 이메일, 카테고리, AdSense ID 등은 전부 이 파일 하나에 있습니다.

```
src/consts.js
```

**AdSense 승인되면** 이 파일의 `ADSENSE.client`에 `ca-pub-...`를 넣고 배포하면 끝입니다.
그리고 `public/ads.txt`에 AdSense가 주는 한 줄을 붙여넣으세요.
