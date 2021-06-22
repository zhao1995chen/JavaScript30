(function () {
  const panels = document.querySelectorAll('.panel');

  function clickHandler() {
    this.classList.toggle('open');
  }

  function transactionendHandler(e) {
    console.log(e);
    if (e.propertyName === 'flex-grow') this.classList.toggle('open-active');
    else if (e.propertyName === 'flex') this.classList.toggle('open-active'); // Safari
  }

  panels.forEach((panel) => {
    panel.addEventListener('click', clickHandler);
    panel.addEventListener('transitionend', transactionendHandler);
  });
})();
