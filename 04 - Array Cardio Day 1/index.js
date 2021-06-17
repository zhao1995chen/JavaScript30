(function () {
  // import wikiCrawler from './crawler';

  const inventors = [
    {first: 'Albert', last: 'Einstein', year: 1879, passed: 1955},
    {first: 'Isaac', last: 'Newton', year: 1643, passed: 1727},
    {first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642},
    {first: 'Marie', last: 'Curie', year: 1867, passed: 1934},
    {first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630},
    {first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543},
    {first: 'Max', last: 'Planck', year: 1858, passed: 1947},
    {first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979},
    {first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852},
    {first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905},
    {first: 'Lise', last: 'Meitner', year: 1878, passed: 1968},
    {first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909},
  ];

  const people = [
    'Bernhard, Sandra',
    'Bethea, Erin',
    'Becker, Carl',
    'Bentsen, Lloyd',
    'Beckett, Samuel',
    'Blake, William',
    'Berger, Ric',
    'Beddoes, Mick',
    'Beethoven, Ludwig',
    'Belloc, Hilaire',
    'Begin, Menachem',
    'Bellow, Saul',
    'Benchley, Robert',
    'Blair, Robert',
    'Benenson, Peter',
    'Benjamin, Walter',
    'Berlin, Irving',
    'Benn, Tony',
    'Benson, Leana',
    'Bent, Silas',
    'Berle, Milton',
    'Berry, Halle',
    'Biko, Steve',
    'Beck, Glenn',
    'Bergman, Ingmar',
    'Black, Elk',
    'Berio, Luciano',
    'Berne, Eric',
    'Berra, Yogi',
    'Berry, Wendell',
    'Bevan, Aneurin',
    'Ben-Gurion, David',
    'Bevel, Ken',
    'Biden, Joseph',
    'Bennington, Chester',
    'Bierce, Ambrose',
    'Billings, Josh',
    'Birrell, Augustine',
    'Blair, Tony',
    'Beecher, Henry',
    'Biondo, Frank',
  ];

  // Array.prototype.filter()
  // 1. Filter the list of inventors for those who were born in the 1500's
  const filter = inventors.filter(
    (inventor) => 1500 <= inventor.year && inventor.year < 1600 // 箭頭函式預設就會 return
  );

  console.table(filter);

  // Array.prototype.map()
  // 2. Give us an array of the inventors first and last names
  const map = inventors.map((inventor) => `${inventor.first} ${inventor.last}`);

  console.table(map);

  const forEach = [];
  inventors.forEach((inventor) => {
    forEach.push(`${inventor.first} ${inventor.last}`);
  });

  console.table(forEach);

  // Array.prototype.sort()
  // 3. Sort the inventors by birthdate, oldest to youngest
  const sort = inventors.sort(
    (inventor, inventor2) => inventor.year - inventor2.year
  );

  console.table(sort);
  // Array.prototype.reduce()
  // 4. How many years did all the inventors live all together?
  const reduce = inventors.reduce(
    (total, inventor) => total + (inventor.passed - inventor.year),
    0
  );

  // 1 => total = 0, inventor = {first: 'Albert', last: 'Einstein', year: 1879, passed: 1955}
  // 2 => total = 76, inventor = {first: 'Isaac', last: 'Newton', year: 1643, passed: 1727}
  // 3 => total = 76 + 84, inventor = {first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642}
  // ......

  console.log(reduce);

  // 5. Sort the inventors by years lived
  inventors.forEach(
    (inventor) => (inventor.lived = inventor.passed - inventor.year)
  );

  const sort2 = inventors.sort(
    (inventor, inventor2) =>
      inventor.passed - inventor.year - (inventor2.passed - inventor2.year)
  );

  console.table(sort2);

  // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
  // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
  /*
  let array = Array.from(
    document.querySelectorAll('.mw-category-group ul li a')
  ).filter((node) => node.innerHTML.indexOf('de') !== -1);
  // let array = [
  //   ...document.querySelectorAll('.mw-category-group ul li a'),
  // ].filter((node) => node.innerHTML.indexOf('de') !== -1);
  let result = [];
  array.forEach((node) => result.push(node.innerHTML));
  console.table(result);
  */

  // 7. sort Exercise
  // Sort the people alphabetically by last name
  const peopleSort = people.sort((previous, current) => {
    const [previousFirstName, previousLastName] = previous.split(', ');
    const [currentFirstName, currentLastName] = current.split(', ');

    return previousLastName > currentLastName
      ? 1
      : previousLastName < currentLastName
      ? -1
      : 0;
  });

  console.table(peopleSort);

  // 8. Reduce Exercise
  // Sum up the instances of each of these
  const data = [
    'car',
    'car',
    'truck',
    'truck',
    'bike',
    'walk',
    'car',
    'van',
    'bike',
    'walk',
    'car',
    'van',
    'car',
    'truck',
  ];

  const counter = data.reduce((obj, content) => {
    if (!obj[content]) obj[content] = 1;
    else obj[content] += 1;

    return obj;
  }, {});

  console.table(counter);
})();
