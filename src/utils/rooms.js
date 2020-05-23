import { getGameId } from "./games";

const getHostPlayerName = _room => {
  let hostPlayerName = _room.hostPlayerName;
  if (
    // Fix for DRAGON BALL FighterZ
    _room.contentId.toLowerCase() === "ffffffffffffffff" &&
    hostPlayerName === "DBFighter"
  ) {
    return undefined;
  }
  return hostPlayerName;
};

const getPlayers = _room => {
  if (
    // Fix for DRAGON BALL FighterZ
    _room.contentId.toLowerCase() === "ffffffffffffffff"
  ) {
    return [];
  }
  return _room.nodes.map(({ playerName }) => playerName);
};

const AdvertiseDataMap = _gameId => {
  switch (_gameId) {
    // Animal Crossing
    case "01006f8002326000":
      return data => {
        const islandBin = fromHex(data).slice(28);
        const dodoCode = data.charAt(557) === "1";
        return {
          island: decodeUtf16(islandBin),
          dodoCode
        };
      };
    default:
      return () => undefined;
  }
};

const decodeUtf16 = data => {
  const decoder = new TextDecoder("utf-16");
  const u16 = new Uint16Array(data);
  const cut = u16.findIndex(i => i === 0);
  return decoder.decode(data.slice(0, cut * 2));
};

const fromHex = hex => {
  const buf = hex.match(/[0-9a-fA-F]{2}/gi);
  if (!buf) {
    throw new Error("Wrong hex");
  }
  return new Uint8Array(buf.map(h => parseInt(h, 16))).buffer;
};
const getAdvertiseData = _room => {
  let { contentId, advertiseData } = _room;
  let gameId = getGameId(contentId);
  return AdvertiseDataMap(gameId)(advertiseData);
};

export { getHostPlayerName, getPlayers, getAdvertiseData };
