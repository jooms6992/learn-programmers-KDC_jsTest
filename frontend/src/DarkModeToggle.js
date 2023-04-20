class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target, onChange }) {
    const $wrappper = document.createElement('section');
    const $DarkModeToggle = document.createElement('input');
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = 'checkbox';

    $DarkModeToggle.className = 'DarkModeToggle';
    $wrappper.appendChild($DarkModeToggle);
    $target.appendChild($wrappper);

    $DarkModeToggle.addEventListener('change', (e) => {
      // checkbox의 checked 상태
      console.dir(e.target.checked);
      // onChange(e.target.checked);
      // documentElement는 최상위 HTML element요소(root요소)
      this.setColorMode(e.target.checked);
    });

    // 초기화 3가지
    // isDarkMode state, checkbox 상태, html attr
    this.initColorMode();
  }
  // 요거 setState로 만들어보기
  initColorMode() {
    // @meida는 matchMedia로 감지할 수 있다 // MediaQueryListEvent: matches property
    // 즉 js에서도 @media조건문을 활용할수있다
    // 다크모드상태를 윈도우에서 받아온다
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // 받아온 상태로 초기화함
    this.$DarkModeToggle.checked = this.isDarkMode;
    // html태그의 color-mode속성 초기화
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      'color-mode',
      isDarkMode ? 'dark' : 'light'
    );
  }

  // setState(nextData) {
  //   this.data = nextData;
  //   this.initColorMode(this.data.isDarkMode);
  // }
}
