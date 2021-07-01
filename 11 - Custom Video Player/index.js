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
  const inputs = document.querySelectorAll('input');

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

    if (viewer.paused) viewer.play();
    else viewer.pause();

    iconChange(viewer.paused);
  };

  const iconChange = (flag) => {
    console.table([
      ['innerHTML', toggle.innerHTML],
      ['outerHTML', toggle.outerHTML],
      ['innerText', toggle.innerText],
      ['textContent', toggle.textContent],
    ]);

    toggle.innerHTML = flag ? '►' : '❚ ❚';
  };

  const skipHandler = (e) => {
    console.dir(e.currentTarget);
    console.log(typeof e);

    if (typeof e === 'object')
      viewer.currentTime += parseInt(e.currentTarget.dataset.skip);
    else viewer.currentTime += e;

    viewer.currentTime =
      viewer.currentTime < 0
        ? 0
        : viewer.currentTime > viewer.duration
        ? viewer.duration
        : viewer.currentTime;
  };

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

  setInterval(scrollbarHandler, 50);

  let isDown = false;

  const progressHandler = (e) => {
    console.dir(e);
    console.table([e.offsetX, progress.clientWidth]);

    if (e.type === 'click' || (e.type === 'mousemove' && isDown))
      moveHandler(e);
  };

  const moveHandler = (e) => {
    const percentage = e.offsetX / progress.clientWidth;

    document.documentElement.style.setProperty(
      '--progress',
      percentage * 100 + '%'
    );
    viewer.currentTime = viewer.duration * percentage;
  };

  // eventListeners
  window.addEventListener('keydown', keyHandler);
  viewer.addEventListener('click', playHandler);
  toggle.addEventListener('click', playHandler);
  minus.addEventListener('click', skipHandler);
  plus.addEventListener('click', skipHandler);

  inputs.forEach((input) =>
    input.addEventListener('mousemove', valueChangeHandler)
  );

  progress.addEventListener('click', progressHandler);
  progress.addEventListener('mousedown', () => (isDown = true));
  progress.addEventListener('mousemove', progressHandler);
  progress.addEventListener('mouseup', () => (isDown = false));
})();
