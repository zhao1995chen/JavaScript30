(function () {
  const imgs = document.querySelectorAll('.slide-in');

  function debounce(func, wait = 20, immediate = true) {
    let timer;
    return function () {
      let context = this;
      let args = arguments;

      clearTimeout(timer); // 如果已經有計時器在跑就把原本的清掉
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
      if (immediate) func.apply(context, args);
      else clearTimeout(timer); // 如果已經立即執行就把 timer 清掉不重複執行
    };
  }

  function showHandler() {
    // console.log(this);
    console.log(new Date().getMilliseconds());
    const slideTop = this.scrollY;
    const slideBottom = this.scrollY + this.innerHeight;

    imgs.forEach((img) => {
      // console.dir(img);

      const imgMid = img.offsetTop + img.height / 2;
      const method =
        slideTop < imgMid && imgMid < slideBottom ? 'add' : 'remove';

      img.classList[method]('active');
    });
  }

  window.addEventListener('scroll', debounce(showHandler));
})();
