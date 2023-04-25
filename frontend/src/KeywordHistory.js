import uniqueArray from './utils/uniqueArray.js';

class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement('ul');
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = 'KeywordHistory';
    $target.appendChild(this.$keywordHistory);

    // 데이터가 필요한 ui를 만드는 단계에서 아직 데이터가 없을 때 더미데이터로 시작한다
    // this.data = ['아', '고양이', 'cat'];

    this.onSearch = onSearch;
    this.init();
    this.render();
  }
  // 여기서도 우선 더미데이터를 전달해서 차근차근 확인해가며 만든다
  init() {
    const data = this.getHistory();

    this.setState(data);
  }

  addKeyword(keyword) {
    let keywordHistory = this.getHistory();
    // const로 해줘도 상관없지만 기억을 위해서 이렇게 작업하기도 한다
    keywordHistory.unshift(keyword);
    // 중복제거
    keywordHistory = uniqueArray(keywordHistory);
    // 최대 5개만 저장
    keywordHistory = keywordHistory.slice(0, 5);
    localStorage.setItem('keywordHistory', keywordHistory.join(','));
    // 스트링 -> 배열 -> 스트링 으로 변환하며 저장
    this.init();
    // init으로 로컬스터리지에 있는 데이터 화면에 반영 렌더링
  }

  getHistory() {
    return localStorage.getItem('keywordHistory') === null
      ? []
      : localStorage.getItem('keywordHistory').split(',');
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  bindEvent() {
    this.$keywordHistory
      .querySelectorAll('li button')
      .forEach(($item, index) => {
        $item.addEventListener('click', (e) => {
          console.log(this.data[index]);
          this.onSearch(this.data[index]);
        });
      });
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map(
        (keyword) => `
             <li><button>${keyword}</button></li>
            `
      )
      .join(''); // join을 해줘야한다!!

    this.bindEvent();
  }
}

export default KeywordHistory;
