import KeywordHistory from './KeywordHistory.js';

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrappper = document.createElement('section');
    $wrappper.className = 'SearchInputSection';
    $wrappper;
    $target.appendChild($wrappper);

    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';

    $searchInput.className = 'SearchInput';
    $wrappper.appendChild($searchInput);

    // keyup은 한글일때 두번엔터가 되는 오류가 난다
    $searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
        // 최근 키워드 저장
        this.KeywordHistory.addKeyword(e.target.value);
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

    this.KeywordHistory = new KeywordHistory({
      $target: $wrappper,
      onSearch,
    });
  }
  render() {}
}

export default SearchInput;
