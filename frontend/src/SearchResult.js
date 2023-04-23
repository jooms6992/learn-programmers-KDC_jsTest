// App.js(상위 컴포넌트)에서 제공해주는 내용을 출력만해주는 역할

// import Empty from './Empty.js';
class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrappper = document.createElement('section');
    this.$searchResult = document.createElement('ul');
    this.$searchResult.className = 'SearchResult';
    $wrappper.appendChild(this.$searchResult);
    $target.appendChild($wrappper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    // this.Empty = new Empty({
    //   $target: $wrappper
    // });

    this.render();
  }

  setState(nextData) {
    this.data = nextData || [];
    console.log(this.data, '---SearchResult');
    this.render();
  }

  // 무한스크롤, 레이지로딩
  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      // 아이템이 화면에 보일 때
      if (item.isIntersecting) {
        // 이미지를 로드한다.
        // img의 src(더미이미지)를 데이터에 저장해놓은 실제src로 대체해준다
        // 이렇게 레이지 로딩 구현!
        item.target.querySelector('img').src =
          item.target.querySelector('img').dataset.src;
        // 마지막 요소를 찾아낸다
        let dataIndex = Number(item.target.dataset.index);
        // 마지막 요소라면? nextpage를 호출
        if (dataIndex + 1 === this.data.length) {
          this.onNextPage();
        }
      }
    });
  });

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index} >
            <img src= 'https://via.placeholder.com/200x300/FFFF00/000000' alt=${cat.name}
            data-src=${cat.url}
            />
          </li>
        `
      )
      .join('');

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });
      this.listObserver.observe($item);
    });
  }
}
// 두 가지 방법
// 1. 페이지가 끝까지 갔을때
// 2. 목록의 마지막 요소가 화면에 보였을때 추가할꺼임 <- 우린 이걸로!
export default SearchResult;
