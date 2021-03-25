<template>
  <h2>{{ $t("install.computer.title", { prefix: "2 - " }) }}</h2>
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
    <p>
      <img
        alt="linux instructional"
        class="screenshot"
        :src="require(`@/assets/switch/lindldrun.jpg`)"
      />
    </p>
      <h2>{{ $t("pages.installSwitch.test.title", { prefix: "3 - " }) }}</h2>
    <p>
      You can test if you have setup everything correctly by putting your Switch
      to sleep and waking it up.
    </p>
    <p>
      If everything is good, you should see IConnection on your lan-play client.
      It will look like:
    </p>
    <p>
      <img
        alt="IConnection"
        class="screenshot"
        :src="require(`@/assets/switch/iconnection.jpg`)"
      />
    </p>
    <p>
      If you do not, verify your switch settings, ensure there is no autoconnect
      profile for a different wireless profile but that autoconnect
      <b>IS</b> enabled for the lanplay profile, and try playing a game. Failing
      this, try rebooting your switch.
      <strong>
        Failing the internet and/or DNS connectivity test on your switch
        <b>DOES NOT MATTER</b> and can be ignored.
      </strong>
    </p>
    <p>
      If this continues to fail, join #help on the lan-play discord for further
      assistance.
    </p>
  <h2>{{ $t("install.games.title", { prefix: "4 - " }) }}</h2>
  <p>
    The application will prompt you to enter the relay server address. You can
    choose the server you want, like <code>switch.lan-play.com:11451</code>.
  </p>
  <p>
    You need to run the client administratively and allow it through your
    firewall. If the client exits right away, ensure you are running as an
    administrator and pasting in the server correctly (example above).
  </p>
  <p>
    Launch the desired game you want to play (Must have the LAN play feature!)
  </p>
  <p>
    You can find a list of games compatible with the LAN play feature
    <router-link :to="games">here</router-link>.
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
