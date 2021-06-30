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

  const items = document.querySelectorAll('.item input[type="checkbox"]');
  const itemTitles = [];
  items.forEach((item) =>
    itemTitles.push({text: item.nextElementSibling.innerHTML})
  );
  console.log('items', items);
  console.log('itemTitles', itemTitles);

  let startIndex;
  let endIndex;

  function inputClickHandler(e) {
    console.dir(e);
    console.log(items);

    if (e.shiftKey) {
      endIndex = itemTitles.findIndex(
        (itemTitle) => e.target.nextElementSibling.innerHTML === itemTitle.text
      );
      console.log('endIndex', endIndex);
      selectAll();
      startIndex = endIndex;
    } else {
      startIndex = itemTitles.findIndex(
        (itemTitle) => e.target.nextElementSibling.innerHTML === itemTitle.text
      );
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

    [startIndex, endIndex] =
      startIndex > endIndex ? [endIndex, startIndex] : [startIndex, endIndex];

    let array = Array.from(items).slice(startIndex, endIndex + 1);

    console.log('new array', array);

    array.forEach((item) => (item.checked = check));
  }

  items.forEach((item) => {
    item.addEventListener('click', inputClickHandler);
  });
})();
