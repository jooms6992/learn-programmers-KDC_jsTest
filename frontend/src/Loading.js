class Loading {
  $Loading = null;
  data = null;

  constructor({ $target }) {
    const $Loading = document.createElement('div');
    this.$Loading = $Loading;
    $target.appendChild(this.$Loading);

    this.data = {
      show: false,
    };

    this.render();
  }

  // Loading컴포넌트에서 ui를 제어하는 메서드를 만들어준다
  show() {
    this.setState({
      show: true,
    });
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$Loading.innerHTML = `
      <div class="Loading">
        <p>
          💛 로딩중 💛
        </p>
      </div>
      `;
    } else {
      this.$Loading.innerHTML = ``;
    }
  }
}
// 로딩화면 숨기는걸 class가 아닌 state로 해보자!
