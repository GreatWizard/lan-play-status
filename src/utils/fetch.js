const fetchWithTimeout = function (url, options, timeout = 20000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
  ])
}

export { fetchWithTimeout }
