const queryRoom = `{room{contentId hostPlayerName nodeCount nodeCountMax advertiseData nodes{playerName}}}`

const subscriptionGql = `{"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription{serverInfo{online idle}}"}}`

export { queryRoom, subscriptionGql }
