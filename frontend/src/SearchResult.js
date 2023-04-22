// App.js(상위 컴포넌트)에서 제공해주는 내용을 출력만해주는 역할
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

    this.render();
  }

  setState(nextData) {
    this.data = nextData || [];
    console.log(this.data, '---SearchResult');
    this.render();
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  applyEventToElement = (items) => {
    document.addEventListener('scroll', () => {
      items.forEach((el, index) => {
        if (this.isElementInViewport(el) && items.length - 1 === index) {
          this.onNextPage();
        }
      });
    });
  };

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join('');

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.data[index]);
      });
    });

    let listItems = this.$searchResult.querySelectorAll('.item');
    this.applyEventToElement(listItems);
  }
}
// 두 가지 방법
// 1. 페이지가 끝까지 갔을때
// 2. 목록의 마지막 요소가 화면에 보였을때 추가할꺼임 <- 우린 이걸로!
