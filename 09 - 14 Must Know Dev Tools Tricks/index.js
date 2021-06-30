(function () {
  const dogs = [
    {name: 'Snickers', age: 2},
    {name: 'Hugo', age: 8},
  ];

  let console = {
    isDev: true,
    log(...args) {
      if (!this.isDev) return;
      window.console.log(...args);
    },
    warn(...args) {
      if (!this.isDev) return;
      window.console.warn(...args);
    },
    info(...args) {
      if (!this.isDev) return;
      window.console.info(...args);
    },
    error(...args) {
      if (!this.isDev) return;
      window.console.error(...args);
    },
    assert(condition, ...args) {
      if (!this.isDev) return;
      window.console.assert(condition, ...args);
    },
    dir(...args) {
      if (!this.isDev) return;
      window.console.dir(...args);
    },
    clear() {
      if (!this.isDev) return;
      window.console.clear();
    },
    table(...args) {
      if (!this.isDev) return;
      window.console.table(...args);
    },
    group(...args) {
      if (!this.isDev) return;
      window.console.group(...args);
    },
    groupEnd(...args) {
      if (!this.isDev) return;
      window.console.groupEnd(...args);
    },
    count(label) {
      if (!this.isDev) return;
      window.console.count(label);
    },
    time(label) {
      if (!this.isDev) return;
      window.console.time(label);
    },
    timeEnd(label) {
      if (!this.isDev) return;
      window.console.timeEnd(label);
    },
  };

  // Regular
  console.log('hello');

  // Interpolated
  console.log("Hello I'm a %s string", '👻');

  // Styled
  console.log(
    "%c I'm some text great",
    'font-size: 50px; background: red; text-shadow: 3px 3px 0px gray;'
  );

  // warning!
  console.warn('OOOOPS');

  // Error :|
  console.error('SHIT');

  // Info
  console.info('Announcement');

  // Testing
  const p = document.querySelector('p');
  console.assert(p.classList.contains('ouch'), "That's wrong!");
  console.assert('', '錯誤');
  console.assert(false, '錯誤');
  console.assert(NaN, '錯誤');
  console.assert(0, '錯誤');
  console.assert(null, '錯誤');
  console.assert(undefined, '錯誤');

  // clearing
  console.clear();

  // Viewing DOM Elements
  console.log(p);
  console.dir(p);

  console.clear();

  // Grouping together
  dogs.forEach((dog) => {
    console.group(`${dog.name}`);
    console.log(`This is ${dog.name}.`);
    console.log(`${dog.name} is ${dog.age} years old.`);
    console.groupEnd(`${dog.name}`);
  });

  // counting
  console.count('Hello');
  console.count('Hello');
  console.count('Hello');
  console.count('Hello');
  console.count('Hello');

  // timing
  console.time('fetching data');
  fetch('https://api.github.com/users/wesbos')
    .then((resp) => resp.json())
    .then((data) => {
      console.timeEnd('fetching data'); // 名字要相同才對得起來
      console.log(data);
    });

  console.table(dogs);
  console.table(dogs, ['name']);

  let array1 = [];
  console.time('test array1 insert');
  for (let i = 1; i < 10000000; i++) {
    array1.push(i);
  }
  console.timeEnd('test array1 insert');

  let array2 = [];
  console.time('test array2 insert');
  for (let i = 1; i < 10000000; i++) {
    array2.push({count: i});
  }
  console.timeEnd('test array2 insert');

  let array3 = [];
  console.time('test array3 insert');
  for (let i = 1; i < 10000000; i++) {
    array3.push(i % 2 ? i : {count: i});
  }
  console.timeEnd('test array3 insert');

  console.time('test array1');
  array1.forEach((item) => {
    let j = item;
  });
  console.timeEnd('test array1');

  console.time('test array2');
  array2.forEach((item) => {
    let j = item;
  });
  console.timeEnd('test array2');

  console.time('test array3');
  array3.forEach((item) => {
    let j = item;
  });
  console.timeEnd('test array3');
})();

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}
