<template>
  <div>
    <h2>2 - Computer configuration</h2>
    <h3>Windows</h3>
    <p>
      First, you need to install
      <a
        href="https://www.winpcap.org/install/default.htm"
        target="_blank"
        rel="noreferrer noopener"
      >
        WinPcap
      </a>
    </p>

    <p>Then double-click on <code>lan-play-win64.exe</code>.</p>
    <h3>MacOS</h3>
    <p>
      First, you need to install
      <a href="https://brew.sh" target="_blank" rel="noreferrer noopener">
        Homebrew</a
      >
    </p>
    <p>Then in a terminal: <code>brew install libpcap libuv</code></p>
    <p>Finally in a terminal: <code>sudo ./lan-play-macos</code></p>
    <h3>Ubuntu/Debian</h3>
    <p>
      In a terminal: <code>sudo apt install libpcap0.8-dev libuv1-dev</code>
    </p>
    <p>Finally in a terminal: <code>sudo ./lan-play-linux</code></p>
    <h2>3 - Start the LAN Play Client</h2>
    <p>
      The application will prompt you to enter the relay server address. You can
      choose the server you want, like <code>switch.lan-play.com:11451</code>.
    </p>
    <p>
      You need to run the client administratively and allow it through your
      firewall.
    </p>
    <h2>4 - You can now play games that have the LAN play feature</h2>
    <p>
      Launch the desired game you want to play (Must have the LAN play feature!)
    </p>
    <p>
      You can find a list of games compatible with the LAN play feature
      <a :href="games"> here</a>.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    games() {
      return `/games-${this.type}`;
    }
  }
};
</script>
