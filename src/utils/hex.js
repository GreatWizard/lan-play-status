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

const hexToUtf16 = hex => decodeUtf16(fromHex(hex));

const hexToUtf8 = hex => {
  const cut = hex.indexOf("00");
  return decodeURIComponent(
    "%" +
      hex
        .slice(0, cut)
        .match(/.{1,2}/g)
        .join("%")
  );
};

const hexToAscii = hex => {
  let str = "";
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
};

const hexToInt = hex => parseInt(hex, "16");

export { decodeUtf16, fromHex, hexToUtf16, hexToUtf8, hexToAscii, hexToInt };
