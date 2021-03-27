<template>
  <h2>{{ $t("install.computer.title", { prefix: "2 - " }) }}</h2>
  <h3>Windows</h3>
  <p>
    First, you need to install
    <a
      href="https://www.winpcap.org/install/bin/WinPcap_4_1_3.exe"
      target="_blank"
      rel="noreferrer noopener"
    >
      WinPcap </a
    >.
  </p>
  <p>
    Then download and run
    <a :href="ldnMitmWin64Link" target="=_blank" rel="noreferrer noopener">
      <code>lan-play-win64.exe</code></a
    >
    <strong> as an administrator</strong>.
  </p>
  <h3>MacOS</h3>
  <p>
    First, you need to install
    <a href="https://brew.sh/" target="_blank" rel="noreferrer noopener"
      >Homebrew</a
    >.
  </p>
  <p>Then in a terminal: <code>brew install switch-lan-play</code>.</p>
  <p>Finally in a terminal: <code>lan-play --pmtu 500</code>.</p>
  <Terminal
    title="user@mac: ~/"
    content="$ brew install switch-lan-play
==> Downloading https://homebrew.bintray.com/bottles/switch-lan-play-0.2.3.catalina.bottle.tar.gz
==> Pouring switch-lan-play-0.2.3.catalina.bottle.tar.gz
🍺  /usr/local/Cellar/switch-lan-play/0.2.3: 5 files, 922.4KB
$ lan-play --pmtu 500 --relay-server-addr switch.lan-play.com:11451
Interface not specified, opening all interfaces
[DEBUG]: open en0 ok
[DEBUG]: open p2p0 fail: datalink(12)
[DEBUG]: open awdl0 ok
[DEBUG]: open llw0 ok
[DEBUG]: open utun0 fail: datalink(0)
[DEBUG]: open utun1 fail: datalink(0)
[DEBUG]: open lo0 fail: datalink(0)
[DEBUG]: open en1 ok
[DEBUG]: open en2 ok
[DEBUG]: open gif0 fail: datalink(0)
[DEBUG]: open stf0 fail: datalink(0)
[DEBUG]: open ap1 ok
pcap loop start
[DEBUG]: packet init buffer 0x10ecb9bb0
[DEBUG]: pmtu is set to 500
Server IP: 149.91.81.201"
  />
  <h3>Ubuntu/Debian</h3>
  <p>
    You need to download
    <a
      href="https://github.com/spacemeowx2/switch-lan-play/releases/download/v0.2.3/lan-play-linux"
      target="=_blank"
      rel="noreferrer noopener"
    >
      <code>lan-play-linux</code></a
    >.
  </p>
  <p>
    Then in a terminal: go to the directory you downloaded to (likely
    ~/Downloads) and input <code>chmod +x lan-play-linux</code>.
  </p>
  <p>
    Finally in a terminal: <code>./lan-play-linux --pmtu 500</code> (ensuring
    you are in the proper directory (likely ~/Downloads).
  </p>
  <Terminal
    title="user@linux: ~/Downloads"
    content="$ cd ~/Downloads
$ wget --quiet https://github.com/spacemeowx2/switch-lan-play/releases/download/v0.2.3/lan-play-linux
$ chmod +x lan-play-linux
$ sudo ./lan-play-linux --pmtu 500 --relay-server-addr switch.lan-play.com:11451
Interface not specified, opening all interfaces
[DEBUG]: open veth3b172e4 ok
[DEBUG]: open br-f2c3fb820b84 ok
[DEBUG]: open ensi92 ok
[DEBUG]: open any fail: datalink(113)
[DEBUG]: open lo fail: get all zero mac
[DEBUG]: open nfqueue fail: datalink(228)
[DEBUG]: open usbmon1 fail
[DEBUG]: open usbmon2 fail
pcap loop start
[DEBUG]: packet init buffer 0x55b3687b58c0
[DEBUG]: pmtu is set to 500
Server IP: 149.91.81.201"
  />
  <h2>{{ $t("install.games.title", { prefix: "3 - " }) }}</h2>
  <p>
    If you omit the <code>--relay-server-addr</code> option, the application
    will prompt you to enter the relay server address. You can choose the server
    you want, like <code>switch.lan-play.com:11451</code>.
  </p>
  <p>
    You need to run the client administratively and allow it through your
    firewall. If the client exits right away, ensure you are running as an
    administrator and pasting in the server correctly.
  </p>
  <h2>{{ $t("install.games.title", { prefix: "4 - " }) }}</h2>
  <p>
    Launch the desired game you want to play (must have the LAN play feature).
  </p>
  <p>
    You can find a list of games compatible with the LAN play feature
    <router-link :to="games">here</router-link>.
  </p>
</template>

<script>
import Terminal from "@/components/Terminal.vue";
import { ldnMitmVersion } from "@/config";

export default {
  components: {
    Terminal
  },
  props: {
    type: String
  },
  data() {
    return {
      ldnMitmVersion
    };
  },
  computed: {
    games() {
      return `/games-${this.type}`;
    },
    ldnMitmWin64Link() {
      return `https://github.com/spacemeowx2/switch-lan-play/releases/download/${ldnMitmVersion}/lan-play-win64.exe`;
    }
  }
};
</script>
