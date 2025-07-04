# DevTools Simulator

웹 프론트엔드 개발자를 위한 크롬 개발자도구(DevTools) 시뮬레이터

---

## 소개

DevTools Simulator는 크롬 개발자도구의 주요 패널(Elements, Console, Network 등)을 웹에서 직접 체험하고 학습할 수 있도록 만든 시뮬레이션 앱입니다. 실제 DevTools를 사용하기 어려운 환경이나, 입문자/교육용으로 DevTools의 핵심 기능을 쉽고 직관적으로 익힐 수 있습니다.

## 주요 기능

- **Elements 패널**: DOM 구조 탐색, HTML/CSS 실습, 스타일/클래스 실시간 변경
- **Console 패널**: 다양한 로그/에러/경고 출력, 실시간 코드 실행, 에러 추적 실습
- **Network 패널**: 네트워크 요청/응답 시뮬레이션, 상태코드/헤더/바디 분석
- **Sources, Application, Performance, Memory**: 각 패널별 핵심 개념 및 실습 가이드 제공
- **가독성 높은 학습 카드**: 실습 예시, 팁, 요약 등 시각적으로 구분된 설명 제공

## 설치 및 실행 방법

1. 저장소 클론
   ```bash
   git clone [저장소 주소]
   cd devtools-simulator
   ```
2. 의존성 설치
   ```bash
   npm install
   ```
3. 개발 서버 실행
   ```bash
   npm run dev
   ```
4. 브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

## 폴더 구조

```
src/
  components/
    panels/         # 각 DevTools 패널별 컴포넌트
  contexts/         # 전역 상태 관리
  assets/           # 이미지, 아이콘 등
  types/            # 타입 정의
  App.tsx           # 메인 앱 컴포넌트
  main.tsx          # 진입점
public/              # 정적 파일
```

## 기여 방법

1. 이슈/버그/개선사항은 [GitHub Issues]에 등록해 주세요.
2. PR(Pull Request) 환영합니다! (기능 추가/버그 수정/문서 개선 등)
3. 코드 컨벤션: Prettier, ESLint 적용

## 라이선스

MIT License

---

문의: [프로젝트 관리자 이메일 또는 GitHub 프로필]
