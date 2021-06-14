(function () {
  const inputs = document.querySelectorAll('.controls input');
  console.log(inputs);

  function inputHandler() {
    // console.log(this); // this 取到的是整個 html 物件
    // 這裡的 this 是 addEventListener 的 input
    console.log(this.name, this.value, this.dataset);

    /*
    // 直接設定大法，不過當需要被設定的地方一多就會長的很可怕，用變數統一管理，改一個就改全部
    switch (this.name) {
      case 'spacing':
        document.querySelector('img').style.padding =
          this.value + (this.dataset.sizing || '');
        break;
      case 'blur':
        document.querySelector('img').style.filter = `blur(${this.value}${
          this.dataset.sizing || ''
        })`;
        break;
      case 'base':
        document.querySelector('img').style.background = this.value;
        document.querySelector('.hl').style.color = this.value;
        break;
    }
    */

    document.documentElement.style.setProperty(
      `--${this.name}`,
      this.value + (this.dataset.sizing || '')
    );
  }

  inputs.forEach(function (input) {
    input.addEventListener('mousemove', inputHandler); // 鼠標移動到 scollbar 上就觸發，無論值是否有改變
    input.addEventListener('change', inputHandler); // 在放開的時候觸發
  });
})();
