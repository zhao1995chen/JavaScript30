(function () {
  const people = [
    {name: 'Wes', year: 1988},
    {name: 'Kait', year: 1986},
    {name: 'Irv', year: 1970},
    {name: 'Lux', year: 2015},
  ];

  const comments = [
    {text: 'Love this!', id: 523423},
    {text: 'Super good', id: 823423},
    {text: 'You are the best', id: 2039842},
    {text: 'Ramen is my fav food ever', id: 123523},
    {text: 'Nice Nice Nice!', id: 542328},
  ];

  // Some and Every Checks
  // Array.prototype.some() // is at least one person 19 or older?
  const some = people.some(
    (person) => new Date().getFullYear() - person.year >= 19
  );
  console.log('Is at least one person 19 or older?', some);

  // Array.prototype.every() // is everyone 19 or older?
  const every = Array.from(people).every(
    (person) => new Date().getFullYear() - person.year >= 19
  );
  console.log('Is everyone 19 or older?', every);

  // Array.prototype.find()
  // Find is like filter, but instead returns just the one you are looking for
  // find the comment with the ID of 823423
  const find = comments.find((comment) => comment.id === 823423);
  console.table(find);

  // Array.prototype.findIndex()
  // Find the comment with this ID
  const findIndex = comments.findIndex((comment) => comment.id === 823423);
  console.log('Find the comment with this ID.', findIndex);

  // delete the comment with the ID of 823423
  // splice()
  // console.table(comments.splice(findIndex, 1));
  // console.table(comments);

  // slice()
  const newComments = [
    ...comments.slice(0, findIndex),
    ...comments.slice(findIndex + 1),
  ];
  console.table(newComments);

  newComments[2].text = '123';
  console.table(comments);
  console.table(newComments);
})();
