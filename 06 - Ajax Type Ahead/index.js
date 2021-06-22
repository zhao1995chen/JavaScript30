(function () {
  const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  let city = [];
  const input = document.querySelector('.search');

  function listHandler() {
    console.log(this.value);
    fetch(endpoint)
      .then((response) => response.json())
      .then(
        (list) => {
          console.log('list', list);
          city = list.filter(
            (city) =>
              city.state.toUpperCase().includes(this.value.toUpperCase()) ||
              city.city.toUpperCase().includes(this.value.toUpperCase())
          );
        },
        (err) => {
          console.error(err);
        }
      )
      .then(() => {
        console.log('city', city);
        const list = document.querySelector('.suggestions');

        if (city.length > 1) {
          // 有才執行
          while (list.firstChild) list.removeChild(list.firstChild);
          city.forEach((c) => {
            const node = document.createElement('li');
            const cityName = document.createElement('span');
            const population = document.createElement('span');

            cityName.appendChild(
              document.createTextNode(`${c.city}, ${c.state}`)
            );
            node.appendChild(cityName);

            let formatter = new Intl.NumberFormat();
            population.classList.add('population');
            population.appendChild(
              document.createTextNode(`${formatter.format(c.population)}`)
            );
            node.appendChild(population);

            list.append(node);
          });
        }
      });
  }

  input.addEventListener('keyup', listHandler);
})();
