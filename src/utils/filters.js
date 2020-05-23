const notEmpty = e => e !== undefined && e !== "";
const filterBy = (key, value) => e => e && e[key] === value;
const rejectBy = (key, value) => e => e && e[key] !== value;
const truthyBy = key => e => e && !!e[key];
const falsyBy = key => e => e && !e[key];

export { notEmpty, filterBy, rejectBy, truthyBy, falsyBy };
