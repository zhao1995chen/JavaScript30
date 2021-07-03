(function () {
  const imgs = document.querySelectorAll('.slide-in');

  function showHandler() {
    console.log(this);

    imgs.forEach((img) => {
      console.dir(img);

      const imgMid = img.offsetTop + img.height / 2;
      const slideTop = this.scrollY;
      const slideBottom = this.scrollY + this.innerHeight;
      const method =
        slideTop < imgMid && imgMid < slideBottom ? 'add' : 'remove';

      img.classList[method]('active');
    });
  }

  window.addEventListener('scroll', showHandler);
})();
