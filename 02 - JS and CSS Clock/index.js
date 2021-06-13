(function () {
  function setClock() {
    const time = new Date();

    const hourDeg =
      time.getHours() * (360 / 12) + time.getMinutes() * (360 / 12 / 60);
    const minuteDeg =
      time.getMinutes() * (360 / 60) + time.getSeconds() * (360 / 60 / 60);
    const secondDeg = time.getSeconds() * (360 / 60);

    const hour = document.querySelector('.hour-hand');
    const minute = document.querySelector('.min-hand');
    const second = document.querySelector('.second-hand');

    hour.style.transform = `rotate(${hourDeg}deg)`;
    minute.style.transform = `rotate(${minuteDeg}deg)`;
    second.style.transform = `rotate(${secondDeg}deg)`;
  }

  /*
  // setInterval
  setClock(); // 初始化畫面
  setInterval(setClock, 1000);
  */

  function timeoutHandler() {
    setClock(); // 初始化畫面
    setTimeout(timeoutHandler, 1000);
  }

  /*
  // setTimeout
  setTimeout(timeoutHandler, 1000);
  */

  // requestAnimationFrame
  function animationHandler() {
    setClock(); // 初始化畫面
    requestAnimationFrame(animationHandler);
  }

  requestAnimationFrame(animationHandler);
})();
