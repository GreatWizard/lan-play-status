const sortByString = key => (a, b) => {
  let aKey = a[key].toLowerCase();
  let bKey = b[key].toLowerCase();
  return aKey > bKey ? 1 : bKey > aKey ? -1 : 0;
};

export { sortByString };
