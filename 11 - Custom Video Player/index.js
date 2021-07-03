(function () {
  let console = {
    isDev: false,
    dir(item) {
      if (!this.isDev) return;
      window.console.dir(item);
    },
    table(...args) {
      if (!this.isDev) return;
      window.console.table(...args);
    },
    log(...args) {
      if (!this.isDev) return;
      window.console.log(...args);
    },
  };

  // elements
  const viewer = document.querySelector('.viewer');
  const toggle = document.querySelector('.toggle');
  const minus = document.querySelector('.minus');
  const plus = document.querySelector('.plus');
  const progress = document.querySelector('.progress');
  const ranges = document.querySelectorAll('.ranges');

  // handlers
  const keyHandler = (e) => {
    console.dir(e);

    switch (e.keyCode) {
      case 13:
      case 32:
        playHandler();
        break;
      case 37:
        skipHandler(-10);
        break;
      case 39:
        skipHandler(25);
        break;
    }
  };

  const playHandler = (e) => {
    console.dir(e);
    console.dir(viewer);

    // if (viewer.paused) viewer.play();
    // else viewer.pause();

    viewer[viewer.paused ? 'play' : 'pause']();
  };

  const iconChange = () => {
    console.table([
      ['innerHTML', toggle.innerHTML],
      ['outerHTML', toggle.outerHTML],
      ['innerText', toggle.innerText],
      ['textContent', toggle.textContent],
    ]);

    toggle.innerHTML = viewer.paused ? '►' : '❚ ❚';
  };

  function skipHandler(e) {
    console.dir(e.currentTarget);
    console.log(typeof e);

    // 對觸發click事件呼叫及keydown事件呼叫進行不同的取值處理
    viewer.currentTime +=
      typeof e === 'object' ? parseFloat(this.dataset.skip) : e;

    viewer.currentTime =
      viewer.currentTime < 0
        ? 0
        : viewer.currentTime > viewer.duration
        ? viewer.duration
        : viewer.currentTime;
  }

  const scrollbarHandler = () => {
    console.table({currentTime: viewer.currentTime, duration: viewer.duration});

    document.documentElement.style.setProperty(
      '--progress',
      (viewer.currentTime / viewer.duration) * 100 + '%'
    );
  };

  function valueChangeHandler() {
    console.log(this.name, this.value);
    viewer[this.name] = this.value;
  }

  let isDown = false;

  const progressHandler = (e) => {
    console.dir(e);
    console.table([e.offsetX, progress.clientWidth]);

    viewer.currentTime = (viewer.duration * e.offsetX) / progress.clientWidth;
  };

  // eventListeners
  window.addEventListener('keydown', keyHandler);

  viewer.addEventListener('click', playHandler);
  viewer.addEventListener('timeupdate', scrollbarHandler);
  viewer.addEventListener('play', iconChange);
  viewer.addEventListener('pause', iconChange);

  toggle.addEventListener('click', playHandler);
  minus.addEventListener('click', skipHandler);
  plus.addEventListener('click', skipHandler);

  ranges.forEach((range) =>
    range.addEventListener('click', valueChangeHandler)
  );
  ranges.forEach((range) =>
    range.addEventListener('mousemove', valueChangeHandler)
  );

  progress.addEventListener('click', progressHandler);
  progress.addEventListener('mousedown', () => (isDown = true));
  progress.addEventListener('mousemove', (e) => isDown && progressHandler(e));
  progress.addEventListener('mouseup', () => (isDown = false));
})();
