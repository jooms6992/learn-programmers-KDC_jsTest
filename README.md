<h1>1-1_레이아웃, 기본 API 요청</h1>
- cd로 backend frontend 접근해서 npm install 후 npm run start로 서버실행, 로컬호스트로 접속
- 가장 큰 컴포넌트부터 시작해 앱 구조 및 컨벤션 파악하기
- api.js파일에서 포트 'http://localhost:4001';로 바꿔서 api 동작되게끔 하기
- @media 조건문에 따른 사진갯수 그리드 변경하기
- 시멘틱태그로 바꿔주기
- section태그로 각 컴포넌트 래핑해줌
- DarkModeToggle 컴포넌트 만들어서 다크모드 css 적용해줌
**숙제 initColorMode메서드 setState로 바꿔보기

<h1>1-2_1-2_로딩ui</h1>
- index.html에서 스크립트 먼저 연결해주고
- Loading컴포넌트 만들기: 비슷한 컴포넌트 복사해서 이름만 바꿔주고 필요없는거 지워줌
- Loading컴포넌트에서 기본 html만들고 App.js에 연결 후 css스타일링 먼저 해줌
- Loading컴포넌트에서 ui제어하는 메서드 만들어줌
- 이미지검색할때 로딩화면 띄워줄거니깐 App.js의 searchInput인스턴스의 onSearch안에 apit실행 전후로 Loading메서드 넣어줌 그전에 콘솔로 먼저 찍어봄 차근차근
