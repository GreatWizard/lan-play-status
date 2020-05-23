const sortByString = str => {
  return (a, b) => {
    let aStr = a[str].toLowerCase();
    let bStr = b[str].toLowerCase();
    return aStr > bStr ? 1 : bStr > aStr ? -1 : 0;
  };
};

export { sortByString };
