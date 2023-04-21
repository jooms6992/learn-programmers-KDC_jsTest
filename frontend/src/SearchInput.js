const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrappper = document.createElement('section');
    $target.appendChild($wrappper);

    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';

    $searchInput.className = 'SearchInput';
    $wrappper.appendChild($searchInput);

    $searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    // 1-3랜덤버튼
    const $randomButton = document.createElement('button');
    this.$randomButton = $randomButton;
    this.$randomButton.className = 'RandomButton';
    this.$randomButton.textContent = '랜덤고양이';

    $wrappper.appendChild($randomButton);

    $randomButton.addEventListener('click', (e) => {
      onRandomSearch('아');
    });
  }
  render() {}
}
