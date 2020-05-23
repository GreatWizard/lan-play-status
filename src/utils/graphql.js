const closeGql = `{"id":"1","type":"stop"}`;

const gqlRequestAndPing = (server, request, delay = 0, timeout = 20000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("timeout")), timeout);
    let url = `${location.protocol === "https:" ? "wss" : "ws"}://${server}`;
    const ws = new WebSocket(url, "graphql-ws");
    let timeoutId = undefined;
    let lastTime = undefined;
    const doPing = () => {
      ws.send(request);
      lastTime = Date.now();
    };
    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.type === "data" && data.id === "1") {
        let ping = Date.now() - lastTime;
        resolve({ data: data.payload.data, ping });
        ws.send(closeGql);
        ws.close();
      }
    };
    ws.onclose = () => {
      timeoutId && clearTimeout(timeoutId);
    };
    ws.onerror = e => {
      reject(e);
    };
    ws.onopen = () => {
      ws.send(`{"type":"connection_init","payload":{}}`);
      timeoutId = setTimeout(doPing, delay);
    };
  });
};

export { gqlRequestAndPing };
