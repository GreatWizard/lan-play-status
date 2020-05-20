module.exports = function(Vue, options) {
  if (!(options instanceof Object)) {
    throw new Error("Konami plugin needs an options Object");
  }

  const callback = options.callback || function() {};
  if (!(callback instanceof Function)) {
    throw new Error("Konami plugin needs a callback function in options.");
  }

  const code = options.code || [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
  const once = options.once || true;

  const length = code.length;
  let pos = 0;

  document.addEventListener(
    "keydown",
    function(event) {
      if (pos < length) {
        if (event.keyCode === code[pos]) {
          if (length === ++pos) {
            options.callback();
            if (!once) {
              pos = 0;
            }
            return false;
          }
        } else {
          pos = 0;
        }
      }
    },
    false
  );
};
