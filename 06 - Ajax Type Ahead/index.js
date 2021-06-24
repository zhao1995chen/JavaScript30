(function () {
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  let cities = [];

  // 在一開始先取出所有 data，後續處理不去影響到資料本體
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => (cities = data))
    .catch((e) => {
      console.error(e);
      // return Promise.reject(e);
    });

  const input = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  function match(value) {
    return cities.filter((city) => {
      // 排除空白全符合的狀況
      if (value !== '') {
        // 利用正則去對 data 字串整串做不分大小寫的搜索
        const regex = new RegExp(value, 'gi');
        return city.city.match(regex) || city.state.match(regex);
      }
    });
  }

  function display(matchList, value) {
    if (matchList.length > 0) {
      const html = matchList
        .map((city) => {
          // 將 input 加上樣式
          const regex = new RegExp(value, 'gi');
          const cityName = city.city.replace(
            regex,
            `<span class="hl">${value}</span>`
          );
          const stateName = city.state.replace(
            regex,
            `<span class="hl">${value}</span>`
          );
          const formatter = new Intl.NumberFormat();
          return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${formatter.format(city.population)}</span>
        </li>`;
        })
        .join(''); // 預設是用 , 做連接，這裡沒換掉的話畫面會 GG
      suggestions.innerHTML = html;
    } else {
      // 當長度為 0 的時候恢復原始提示訊息
      suggestions.innerHTML = `<li>Filter for a city</li><li>or a state</li>`;
    }
  }

  function listHandler() {
    console.log('input', this.value);
    const matchList = match(this.value);
    console.log('match list', matchList);

    display(matchList, this.value);
  }

  input.addEventListener('keyup', listHandler);
})();
