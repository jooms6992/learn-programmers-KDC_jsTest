class Empty {
  $empty = null;
  data = null;

  constructor({ $target }) {
    const $empty = document.createElement('div');
    this.$empty = $empty;
    this.$empty.className = 'Empty';
    $target.appendChild(this.$empty);

    this.data = {
      show: false,
    };

    this.render();
  }

  show(isEmpty) {
    this.setState({
      show: true,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$empty.style.display = 'block';
      this.$empty.innerHTML = `
        <p>
          😐결과가 없습니다🐱
        </p>
      `;
    } else {
      this.$empty.style.display = 'none';
      this.$empty.innerHTML = ``;
    }
  }
}
// 로딩화면 숨기는걸 class가 아닌 state로 해보자!
export default Empty;
