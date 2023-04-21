console.log('app is running!');
// 가장 큰 단위의 컨테이너 컴포넌트
// 코드를 보면서 컨벤션을 파악한다
class App {
  // $를 쓴건 DOM을 가리킨거
  $target = null;
  // data === state
  data = [];
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
      onSearch: (keyword) => {
        // 로딩 show
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
          // 로딩 hide
          // 로컬에 저장
          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
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
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    console.log(result);
    // JSON stringify로 객체를 string화 해줘야해
    localStorage.setItem('lastResult', JSON.stringify(result));
  }

  init() {
    const lastResult =
      localStorage.getItem('lastResult') === null
        ? []
        : JSON.parse(localStorage.getItem('lastResult'));
    // 불러올때는 다시 JSON parse로 객체화 해줘야 한다!
    this.setState(lastResult);
  }
}
