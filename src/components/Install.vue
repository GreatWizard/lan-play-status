<template>
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

  <p>Then run <code>lan-play-win64.exe</code>.</p>
  as an administrator
  <h3>MacOS</h3>
  <p>
    First, you need to install
    <a href="https://brew.sh" target="_blank" rel="noreferrer noopener">
      Homebrew</a
    >
  </p>
  <p>Next in a terminal: <code>brew install libpcap libuv</code></p>
  <p>
    Then in a terminal: Go to the directory you downloaded to (likely
    ~/Downloads) and input <code>chmod +x lan-play-macos</code>
  </p>
  <p>
    Finally in a terminal: <code>sudo ./lan-play-macos</code> (ensuring you are
    in the proper directory (likely ~/Downloads)
  </p>
  <h3>Ubuntu/Debian</h3>
  <p>In a terminal: <code>sudo apt install libpcap0.8-dev libuv1-dev</code></p>
  <p>
    Then in a terminal: Go to the directory you downloaded to (likely
    ~/Downloads) and input <code>chmod +x lan-play-linux</code>
  </p>
  <p>
    Finally in a terminal: <code>sudo ./lan-play-linux</code> (ensuring you are
    in the proper directory (likely ~/Downloads)
  </p>
  <h2>3 - Start the LAN Play Client</h2>
  <p>
    The application will prompt you to enter the relay server address. You can
    choose the server you want, like <code>switch.lan-play.com:11451</code>.
  </p>
  <p>
    You need to run the client administratively and allow it through your
    firewall. If the client exits right away, ensure you are running as an
    administrator and pasting in the server correctly (example above).
  </p>
  <h2>4 - You can now play games that have the LAN play feature</h2>
  <p>
    Launch the desired game you want to play (Must have the LAN play feature!)
  </p>
  <p>
    You can find a list of games compatible with the LAN play feature
    <a :href="games"> here</a>.
  </p>
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
