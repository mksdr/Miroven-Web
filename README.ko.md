# Miroven-Web

[English](README.md) · [한국어](README.ko.md)

Astro로 만든 Miroven 공식 홈페이지입니다. 제품 소개, 한국어·영어 블로그, 도움말, 보안 안내, 이용약관과 개인정보처리방침을 제공합니다.

[공식 홈페이지](https://miroven.mksdr.bid) · [저널 앱](https://miroven-app.mksdr.bid) · [기여 안내](CONTRIBUTING.md#한국어) · [보안 신고](SECURITY.md#한국어)

## 프로젝트 범위

이 저장소는 정적 홈페이지를 빌드합니다. 기록 작성, 인증, 금고 암호화와 동기화는 별도 프로젝트인 Miroven 클라이언트와 Miroven-API가 담당합니다. 홈페이지는 기록·사진·계정·금고 키에 접근하지 않습니다.

- `/ko/`와 `/en/`에서 한국어·영어 페이지를 제공하며 `/`는 `/ko/`로 이동합니다.
- Markdown 블로그와 언어별 RSS를 제공합니다.
- 시스템·밝은 화면·어두운 화면 테마를 지원하며 홈페이지 전용 테마 설정을 로컬에 저장합니다.
- canonical URL·sitemap을 생성하고 빌드 산출물의 링크를 검사합니다.

## 로컬 개발

Node.js **22.22.0 이상**과 npm이 필요합니다. CI는 Node.js 24를 사용합니다. 명령은 이 저장소의 루트에서 실행합니다.

```sh
npm ci
npm run dev
```

Astro가 출력하는 로컬 주소를 여세요. 홈페이지 실행에는 API 서버·계정·환경 변수 파일이 필요하지 않습니다.

| 명령 | 용도 |
| --- | --- |
| `npm run dev` | 로컬 개발 서버 실행 |
| `npm run check` | Astro 템플릿·TypeScript 검사 |
| `npm test` | 테마 회귀 테스트 |
| `npm run build` | `dist/`에 정적 사이트 생성 |
| `npm run preview` | 기존 빌드 결과를 로컬에서 확인 |
| `npm run verify` | 코드 검사·테스트·빌드·산출물 검증 |

변경을 제출하기 전에 다음을 실행합니다.

```sh
npm run verify
npm run preview
```

두 언어의 변경 페이지와 모바일 배치·키보드 탐색도 확인하세요. 자동 검사 통과만으로 실제 배포나 모든 브라우저의 접근성이 검증되지는 않습니다.

## 저장소 구조

```text
src/
  components/       공통 사이트 컴포넌트
  config/site.ts    공식 주소와 문의처
  content/blog/     한국어·영어 Markdown 게시글
  i18n/             공통 번역과 언어 도우미
  layouts/          페이지·게시글 레이아웃
  lib/              게시글 필터·경로·날짜 처리
  pages/            페이지·RSS·robots.txt·sitemap 라우트
  styles/           디자인 토큰과 스타일
public/             정적 자산과 테마 초기화
scripts/            테마 테스트와 빌드 산출물 검사
.github/workflows/  GitHub Actions 검증
```

## 콘텐츠와 배포

공식 주소·앱 링크·소스 링크·문의 메일은 [`src/config/site.ts`](src/config/site.ts)에서 관리합니다. 홈페이지 소스 저장소는 [mksdr/Miroven-Web](https://github.com/mksdr/Miroven-Web)입니다.

한국어와 영어 콘텐츠를 함께 유지하세요.

배포 대상은 **Cloudflare Pages**입니다. 빌드 명령은 `npm run build`, 출력 디렉터리는 `dist`입니다. GitHub는 소스 보관과 검증을 담당하며 현재 workflow에는 사이트 배포 단계가 없습니다.

## 문서

- [영문 README](README.md)
- [기여 안내](CONTRIBUTING.md#한국어)
- [보안 신고](SECURITY.md#한국어)
- [라이선스 적용 범위](LICENSING.md)

## 라이선스

사이트 소프트웨어에는 [Apache-2.0](LICENSE), 웹사이트 텍스트·편집 콘텐츠에는 **CC BY-NC 4.0**을 적용합니다. 브랜드 자산·상표·공식 정책 원문·타사 자료의 예외와 상세 범위는 [LICENSING.md](LICENSING.md)를 따릅니다. [NOTICE](NOTICE)와 해당 타사 고지를 보존하세요.
