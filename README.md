# GlobalLogis — 국제물류주선 소개 홈페이지

해상·항공 운송, 통관, 내륙운송까지 아우르는 국제물류주선(포워딩) 전문기업 소개용 정적 웹사이트입니다.

## 구성

```
.
├─ index.html   # 전체 페이지 (Tailwind CDN + 커스텀 테마)
├─ js/main.js   # 헤더 스크롤 전환, 모바일 드로어, 카운터, 스크롤 애니메이션, 견적 폼 검증
└─ README.md
```

## 기술 스택

- **Tailwind CSS** (Play CDN) — 빌드 도구 없이 브라우저에서 바로 동작
- 순수 HTML / Vanilla JavaScript
- Google Fonts (Noto Sans KR, Outfit)

## 실행

별도 설치 없이 `index.html`을 브라우저로 열면 됩니다. 로컬 서버로 보려면:

```bash
npx serve .
# 또는
python -m http.server 8000
```

## 섹션

회사소개 · 서비스(해상/항공/통관/내륙/창고/특수화물) · 강점 · 운송절차 · 글로벌 네트워크 · 견적 문의

## 커스터마이징

실제 운영 시 회사명·로고, 연락처/주소, 물류주선업 등록번호, 견적 폼 전송 백엔드를 교체하세요.

> Play CDN은 프로토타입용입니다. 배포 시 Tailwind CLI 빌드로 전환하면 로딩이 더 빠릅니다.
