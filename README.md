# 1-1_레이아웃, 기본 API 요청
- cd로 backend frontend 접근해서 npm install 후 npm run start로 서버실행, 로컬호스트로 접속
- 가장 큰 컴포넌트부터 시작해 앱 구조 및 컨벤션 파악하기
- api.js파일에서 포트 'http://localhost:4001';로 바꿔서 api 동작되게끔 하기
- @media 조건문에 따른 사진갯수 그리드 변경하기
- 시멘틱태그로 바꿔주기
- section태그로 각 컴포넌트 래핑해줌
- DarkModeToggle 컴포넌트 만들어서 다크모드 css 적용해줌
**숙제 initColorMode메서드 setState로 바꿔보기

# 1-2_로딩ui
 - ui 동작 구현 순서
 1. UI흐름을 나열해 봅니다 === 시나리오
 2. 동작이 필요한 point를 뽑아 냅니다.
     1. browser event
     2. 특정 시점
 3. 메소드를 일단 만들어 배치해 봅니다.
     1. console.log()를 통해 인자(argument)확인
     2. 동작 작성
 4. 작은 리팩토링
     1. 중복제거
     2. 변수명 점검
 5. 확인 & 개선

예제 1. 로딩 UI
- UI의 흐름
    1. 목록 요청 시작
        - 로딩 UI show === 등장
    2. 요청중~~
        - show ~
    3. 요청 끝
    4. 요청 결과 상태에 따라 배치,대입 === update
    5. 요청 결과 렌더링
        - 로딩 UI hide === 숨겨짐

 - index.html에서 스크립트 먼저 연결해주고
 - Loading컴포넌트 만들기: 비슷한 컴포넌트 복사해서 이름만 바꿔주고 필요없는거 지워줌
 - Loading컴포넌트에서 기본 html만들고 App.js에 연결 후 css스타일링 먼저 해줌
 - Loading컴포넌트에서 ui제어하는 메서드 만들어줌
 - 이미지검색할때 로딩화면 띄워줄거니깐 App.js의 searchInput인스턴스의 onSearch안에 apit실행 전후로 Loading메서드 넣어줌 그전에 콘솔로 먼저 찍어봄 차근차근
