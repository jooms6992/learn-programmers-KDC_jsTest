import config from './config.js';

const { API_ENDPOINT } = config;

// 에러 목록을 만들어 여러 에러 다루기
const REQUEST_ERROR = {
  500: { msg: '요청실패' },
};

// fetch메서드를 분리, 에러 한번에 처리
// request처럼 성공실패가 확실하지 않으면 trycatch를 쓴다
const request = async (url) => {
  try {
    // async await로 결과를 받아오고
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    } else {
      // 에러를 만들땐 throw문법으로.
      throw REQUEST_ERROR[result.status];
    }
    // catch에 모아서 처리
  } catch (error) {
    alert(error.msg);
    return { data: null };
  }
};

const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsWithLimit: (keyword, limit) => {
    return request(
      `${API_ENDPOINT}/api/cats/search?q=${keyword}&limit=${limit}`
    );
  },
  fetchCatsPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};

export default api;
