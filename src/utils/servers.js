const getFullAddress = _server => {
  return `${_server.ip}:${_server.port}`;
};

export { getFullAddress };
