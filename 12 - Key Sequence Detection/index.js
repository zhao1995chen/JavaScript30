(function () {
  const keyArray = [];
  const keyword = 'banana';

  window.addEventListener('keyup', (e) => {
    console.log(e.key);
    keyArray.push(e.key);
    keyArray.splice(0, keyArray.length - keyword.length); // key
    console.log(keyArray);
    if (keyArray.join('').includes(keyword)) cornify_add();
    // if (keyArray.join('').indexOf(keyword) !== -1) cornify_add();
  });
})();
