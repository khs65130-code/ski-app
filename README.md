# Snowline 스키 장비 대여 앱

## GitHub Pages에 게시하기

1. GitHub에서 새 저장소를 만듭니다.
2. 이 ZIP의 파일을 풀고, 압축을 푼 파일 전체를 저장소 최상위에 올려 `index.html`이 최상위에 있도록 합니다.
3. 기본 브랜치 이름을 `main`으로 사용합니다. `.github/workflows/deploy-pages.yml`이 포함되어 있어 파일을 push하면 GitHub Actions가 Pages에 배포합니다.
4. 저장소의 **Settings → Pages → Build and deployment**에서 **Source: GitHub Actions**를 선택합니다.
5. **Actions** 탭에서 `Deploy Snowline to GitHub Pages` 작업이 성공하면 표시된 `https://<사용자명>.github.io/<저장소명>/` 주소로 앱을 엽니다.

## Firebase 설정

앱은 Firebase Authentication과 Cloud Firestore를 사용하므로 인터넷 연결이 필요합니다.

1. Firebase Console에서 **Authentication → Sign-in method → Email/Password**를 사용 설정합니다.
2. **Authentication → Settings → Authorized domains**에 GitHub Pages 호스트를 추가합니다. 예: `username.github.io` (저장소 이름과 경로는 넣지 않습니다.)
3. Cloud Firestore 데이터베이스를 만듭니다.
4. `firestore.rules`의 규칙을 **Firestore Database → Rules**에 게시합니다.

회원가입 직후 `users/{uid}`에 이메일, 이름, 전화번호, 포인트가 저장됩니다. 대여·반납·결제 기록은 각 회원 UID 아래의 하위 컬렉션에 동기화됩니다. 브라우저 localStorage는 화면 표시와 오프라인 임시 보관용입니다. 반납 사진 원본과 카드 정보는 저장하지 않습니다.

저장 경로:

- 프로필: `users/{uid}`
- 대여 기록: `users/{uid}/rentals/{rentalId}`
- 반납 기록: `users/{uid}/returns/{rentalId}`
- 결제 기록: `users/{uid}/payments/{paymentId}`

회원은 본인 UID 경로만 읽고 쓸 수 있도록 `firestore.rules`에서 제한합니다. 실제 가입 여부는 Firebase Console의 **Authentication → Users**, 문서는 **Firestore Database → Data**에서 확인합니다.

## 로컬 실행

Windows에서는 `run-app.bat`을 더블클릭하면 됩니다. PowerShell 로컬 서버가 `http://localhost:8766`에서 앱을 엽니다. Firebase Authentication의 로컬 테스트를 위해 `localhost`도 Authorized domains에 등록되어 있어야 합니다.

## 데모 기능

- 스키, 부츠, 헬멧, 스키복, 폴대, 고글 대여 수량 선택
- 대여 시작 시간, 이용 시간, 요금, 포인트 할인 계산
- 사진 업로드와 무작위 판독 체험 (실제 AI 분석은 연결하지 않음)
- 계좌이체와 카드 결제 화면 체험 (실제 결제는 연결하지 않음)
- 회원별 Firestore 기록 동기화 및 브라우저 임시 저장
