import api from './api.js';
class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    console.log(this.data, '---ImageInfo');
    this.render();
    this.setFade(nextData.visible);
  }

  setFade(visible) {
    if (visible) {
      this.$imageInfo.classList.add('show');
    } else {
      this.$imageInfo.classList.remove('show');
    }
  }

  // 정보를 요청해서 받아와 무언가를 해줄때는 async await로 해주는게 좋음
  async showDetail(data) {
    // 상세 정보 요청
    const detailinfo = await api.fetchCatDetail(data.cat.id);
    if (detailinfo) {
      // 정보를 업데이트
      this.setState({
        visible: true,
        cat: detailinfo.data,
      });
    }
  }

  // visible state를 변경함으로써 닫게끔
  closeImageInfo() {
    this.setState({
      visible: false,
      cat: undefined,
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      // this.$imageInfo.style.display = 'block';

      // this.$imageInfo.querySelector('.close').addEventListener('click', (e) => {
      //   this.closeImageInfo();
      // });

      // keypress, keydown, keyup 구글링해보기
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeImageInfo();
        }
      });
      this.$imageInfo.addEventListener('click', (e) => {
        console.log(e.target.className);
        if (
          e.target.className.includes('ImageInfo') ||
          e.target.className === 'close'
        ) {
          this.closeImageInfo();
        }
      });
    }
    // else {
    //   this.$imageInfo.style.display = 'none';
    // }
  }
}

export default ImageInfo;
