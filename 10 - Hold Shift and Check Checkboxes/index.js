(function () {
  let console = {
    isDev: true,
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

  const items = Array.from(
    document.querySelectorAll('.item input[type="checkbox"]')
  );

  console.log('items', items);

  let startIndex = null;
  let endIndex = null;

  function inputClickHandler(e) {
    console.dir(e);
    console.log(items);

    if (e.shiftKey) {
      endIndex = items.indexOf(this);
      console.log('endIndex', endIndex);
      selectAll();
      startIndex = endIndex;
    } else {
      startIndex = items.indexOf(this);
      console.log('startIndex', startIndex);
    }
  }

  function selectAll() {
    console.table([
      Array.from(items)[startIndex].checked,
      Array.from(items)[endIndex].checked,
    ]);

    let check = Array.from(items)[endIndex].checked === true;

    /*Array.from(items)[startIndex].checked === true &&
      Array.from(items)[endIndex].checked === false
        ? false
        : Array.from(items)[startIndex].checked === true &&
          Array.from(items)[endIndex].checked === true
        ? true
        : Array.from(items)[startIndex].checked === false &&
          Array.from(items)[endIndex].checked === true
        ? true
        : false;*/

    console.log(check);

    // [startIndex, endIndex] =
    //   startIndex > endIndex ? [endIndex, startIndex] : [startIndex, endIndex];

    let array = Array.from(items).slice(
      Math.min(startIndex, endIndex),
      Math.max(startIndex, endIndex) + 1
    );

    console.log('new array', array);

    array.forEach((item) => (item.checked = check));
  }

  items.forEach((item) => {
    item.addEventListener('click', inputClickHandler);
  });
})();
