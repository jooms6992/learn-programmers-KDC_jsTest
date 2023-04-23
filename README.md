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
 
 # 1-3_랜덤버튼
 1. createElement로 ui만들어주고 appendChild로 화면에 달아준다
 2. onRandomSearch를 App.js에서 만들고 api.js가서 fetchRandomCats메서드 만들어준다
 - 전부 다 기존의 코드 참고해서 만든거일뿐! 어려울거 없다!
 
 **숙제 랜덤버튼 컴포넌트로 만들기
 
 # 1-4_모달제어
 - 상세 정보 요청하고 정보 업데이트 하는 showDetail 메서드 ImageInfo컴포넌트 안에 만들고
 - searchResult onClick함수에 showDetail 실행되게끔
 - 상세 정보 요청은 api.js에서 만들어줌 (id 받아서 실행함)
 - 왜냐 searchResult컴포넌트를 살펴보면 onClick시에 data를 전달받음
 **숙제 showDetail async await 패턴으로 만들어보기
 - 모달창 끄는 제어는 imageInfo컴포넌트 내의 visble state를 변경함으로써 닫히게끔 한다
 
 # 1-5 로컬스토리지
 - localStorage setItem, getItem 사용법 기억하기
 - key.value로 이루어져 있으며 value는 string타입이다
 - 그래서 split()이나 join() 작업이 필요하다
 - JSON형태로 저장한다면 저장할때는 stringify(), 불러올때는 parse()해줘야 한다
 - 초기에 로컬스토리지가 비어있을때 null이 오기 때문에 null이 왔을때 조건문(삼항연산자)로 처리해줘야한다
 **숙제 마지막 키워드 input에 띄워보기

# 1-6 스크롤다음페이지
두 가지 방법
  1. 페이지가 끝까지 갔을때 추가
  2. 목록의 마지막 요소가 화면에 보였을때 추가 <- 이번 강의에선 이걸로!

기본 흐름<br/>
SearchResult에서 App.js에서 제공해주는 내용을 받아와 SearchResult에서 마지막 요소를 감지하여 상위 컴포넌트인 App.js에 다시 전달하는 구조
- 마지막 요소가 화면에 나타내는 것을 어떻게 알아낼지
- 그 순간에 어떻게 원하는 동작을 실행 시켜줄것인지
- api를 어떻게 바꿔줄지
- api에 전달하는 데이터 keyword와 page를 어떻게 관리할지
- 스크롤 이벤트는 반응을 너무 많이 해서 쓰지말고 다른거!

# 1-7 IntersectionObserver
- scroll이벤트가 화면을 reflow하는 작업을 하게 돼서 최적화에 좋지 않고 이게 화면에 반영되어 ux에도 나쁘다
- 하여 IntersectionObserver로 대체한다
- 마지막요소를 감지해 다음 요소를 불러옴으로써 무한스크롤을 구현할 수 있다.
- 처음 로드시 요소가 너무 작게 나와 한번에 모든 아이템이 observe되는 것을 방지하는 법
  1. 로딩이 되기전 더미이미지를 먼저 보여준다.
  2. css에서 요소의 min-width을 크게 지정해준다
- 더미이미지를 실제이미지로 대체하면서 레이지로딩을 구현할 수 있다.
- 더미이미지 주소 :</br> https://via.placeholder.com/300x100/FFFF00/000000.png?text=Test+Image
- 가로x세로/배경색/글자색.확장자?text=텍스트(공백은+로)

