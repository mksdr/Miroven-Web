# Contributing to Miroven-Web

[English](#english) · [한국어](#한국어)

## English

Documentation improvements, translations, bug reports, and focused code contributions are welcome. This repository contains the public website; identify issues that belong to the separate journal client or API.

### Propose a change

Once the GitHub repository is available, use its Issues tab for ordinary bugs and proposals if enabled. Otherwise, contact `miroven@mksdr.bid`. Discuss substantial changes before implementation. Report vulnerabilities privately through [SECURITY.md](SECURITY.md).

For bugs, include the page URL, language, browser, operating system, reproduction steps, and expected and actual behavior. Use synthetic data in screenshots and examples. Remove personal journal content, email addresses, credentials, and session cookies from diagnostics.

### Develop and verify

1. Follow the [README](README.md#local-development) to install dependencies and run the site.
2. Keep the change focused. Preserve existing work and avoid unrelated dependency updates.
3. Update Korean and English content together. Keep policy dates and corresponding sections aligned.
4. Run `npm run verify` and review affected pages locally. Report passes, failures, skips, and environment limitations separately in the pull request.
5. Describe the problem, resulting behavior, and relevant validation. Include meaningful regression coverage when behavior changes.

Use Conventional Commits for pull request titles and final commits on the main branch: `type(optional-scope): summary`. For example, `docs: improve website setup guide` or `fix(i18n): correct language switch links`. Keep one purpose per pull request and use its title when squash merging. Preserve existing history; do not change versions or publish tags as part of routine contributions.

### Licenses

Review [LICENSING.md](LICENSING.md) before contributing or importing materials. Code, editorial content, policy text, brand assets, and third-party materials have different terms. Keep copyright and attribution notices, and identify the source and license of imported assets. This website's licenses do not change those of the client or API.

## 한국어

문서 개선·번역·버그 제보·범위가 분명한 코드 기여를 환영합니다. 이 저장소는 공개 홈페이지를 다룹니다. 저널 클라이언트나 API의 문제라면 해당 프로젝트를 구분해 주세요.

### 변경 제안

GitHub 저장소를 공개하고 Issues를 활성화한 뒤에는 일반 버그와 제안을 해당 저장소의 Issues에 작성하세요. 사용할 수 없다면 `miroven@mksdr.bid`로 문의하세요. 규모가 큰 변경은 구현 전에 범위를 논의해 주세요. 취약점은 [보안 신고 안내](SECURITY.md#한국어)에 따라 비공개로 알려 주세요.

버그 제보에는 페이지 주소·언어·브라우저·운영체제·재현 순서·예상 및 실제 동작을 적어 주세요. 화면과 예시는 합성 데이터를 사용하고 진단 자료에서 개인 기록·이메일 주소·인증정보·세션 쿠키를 제거하세요.

### 개발과 검증

1. [README](README.ko.md#로컬-개발)에 따라 의존성을 설치하고 사이트를 실행합니다.
2. 한 가지 목적에 집중하고 기존 작업을 보존합니다. 무관한 의존성 업데이트는 피합니다.
3. 한국어·영어 콘텐츠를 함께 수정합니다. 정책의 시행일과 대응 조항을 일치시킵니다.
4. `npm run verify`와 로컬 화면 확인을 수행합니다. PR에는 통과·실패·건너뜀·환경 제약을 구분해서 적습니다.
5. 문제·변경 후 동작·검증 결과를 설명합니다. 동작을 바꿀 때는 필요한 회귀 검증을 추가합니다.

PR 제목과 주 브랜치의 최종 커밋은 Conventional Commits의 `type(선택적-scope): 요약` 형식을 사용합니다. 예: `docs: improve website setup guide`, `fix(i18n): correct language switch links`. PR은 한 목적에 집중하고 PR 제목으로 squash 병합합니다. 기존 이력을 보존하고 일반 기여에서 버전을 변경하거나 태그를 발행하지 않습니다.

### 라이선스

기여하거나 외부 자료를 가져오기 전에 [LICENSING.md](LICENSING.md)를 확인하세요. 코드·편집 콘텐츠·정책 원문·브랜드 자산·타사 자료의 조건이 다릅니다. 저작권·출처 고지를 유지하고 가져온 자산의 출처와 라이선스를 표시하세요. 홈페이지의 라이선스는 클라이언트나 API의 라이선스를 변경하지 않습니다.
