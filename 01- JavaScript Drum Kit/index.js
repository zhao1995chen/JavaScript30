(function () {
  function playHandler(e) {
    // 處理 keydown 事件
    console.log(e);

    // 如果沒有考慮支援 IE 可以直接用 querySelector
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    if (audio) {
      // 除錯點：有 audio 才播放
      audio.currentTime = 0; // 除錯點： 目標 > 重複播，currentTime 要設為 0，然後你就擁有了一把機關槍
      audio.play();
    }

    const dom = document.querySelector(`div[data-key='${e.keyCode}']`);
    if (dom) dom.classList.add('playing'); // 除錯點：有 dom 才加樣式

    console.log(audio, dom);
  }

  function removeHandler(e) {
    console.log('remove', e);
    if (e.propertyName === 'transform') {
      // 只在乎要去監聽的 property
      e.currentTarget.classList.remove('playing');
    }
  }

  window.addEventListener('keydown', playHandler);

  document.querySelectorAll('.key').forEach(function (key) {
    // 對有 key 的物件本身做監聽，而不是選取 key 的 NodeList
    key.addEventListener('transitionend', removeHandler);
  });
})();
