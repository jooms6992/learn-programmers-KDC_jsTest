console.log('app is running!');
// 가장 큰 단위의 컨테이너 컴포넌트
// 코드를 보면서 컨벤션을 파악한다

import Loading from './Loading.js';
import DarkModeToggle from './DarkModeToggle.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import api from './api.js';

class App {
  // $를 쓴건 DOM을 가리킨거
  $target = null;
  DEFAULT_PAGE = 1;
  // data === state
  data = {
    items: [],
    page: this.DEFAULT_PAGE,
  };
  // 클래스로 인스턴스를 초기화해줌
  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({ $target });

    this.darkModeToggle = new DarkModeToggle({
      $target,
      onChange: (isDarkMode) => {
        this.darkModeToggle.setState({
          isDarkMode,
        });
      },
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword, limit) => {
        // 로딩 show
        this.Loading.show();
        api.fetchCatsWithLimit(keyword, limit).then(({ data }) => {
          // data가 null,빈배열, 요소 이렇게 3가지 경우가 올 수 있다.
          // 이걸 여기서 처리해주는 것이 아닌 각 컴포넌트에서!
          this.setState({ items: data, page: 1 });
          this.Loading.hide();
          // 로딩 hide
          // 로컬에 저장
          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState({
            items: data,
            page: this.DEFAULT_PAGE,
          });
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },
      onNextPage: () => {
        this.Loading.show();
        const keywordHistory =
          localStorage.getItem('keywordHistory') === null
            ? []
            : localStorage.getItem('keywordHistory').split(',');
        const lastKeyword = keywordHistory[0];
        const page = this.page + 1;
        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          let newData = this.data.items.concat(data);
          this.setState({
            items: newData,
            page: page,
          });
          this.Loading.hide();
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData.items);
  }

  saveResult(result) {
    // JSON stringify로 객체를 string화 해줘야해
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    const lastResult =
      localStorage.getItem('lastResult') === null
        ? []
        : JSON.parse(localStorage.getItem('lastResult'));
    // 불러올때는 다시 JSON parse로 객체화 해줘야 한다!
    this.setState({
      items: lastResult,
      page: this.DEFAULT_PAGE,
    });
  }
}
export default App;
