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
        console.log('show');
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
          console.log('hide');
          // 로딩 hide
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
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
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
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
