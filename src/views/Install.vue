<template>
  <div class="install">
    <h1>Install</h1>
    <h2>1 - Switch configuration</h2>
    <p>
      You need to manually edit the configuration of your local network with
      this informations.
    </p>
    <p>
      <em
        >Note: The IP address can be any from 10.13.0.1 to 10.13.255.254,
        excepting 10.13.37.1. But don't use the same IP address with your
        friend.</em
      >
    </p>
    <p>
      <code>
        <strong>IP Address Settings</strong><br />
        IP Address: 10.13.XX.YY<br />
        Subnet Mask: 255.255.0.0<br />
        Gateway: 10.13.37.1<br />
        <br />
        <strong>DNS settings</strong><br />
        Primary DNS: 163.172.141.219<br />
        Secondary DNS: 207.246.121.77<br />
      </code>
    </p>
    <p>Please follow the screenshots:</p>
    <p>
      <img
        alt="Settings"
        class="screenshot"
        :src="require(`@/assets/switch/settings1.jpg`)"
      />
    </p>
    <p>
      <img
        alt="Settings"
        class="screenshot"
        :src="require(`@/assets/switch/settings2.jpg`)"
      />
    </p>
    <p>
      <img
        alt="Settings"
        class="screenshot"
        :src="require(`@/assets/switch/settings3.jpg`)"
      />
    </p>
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
    <h2>4 - Test you have setup everything correctly</h2>
    <p>
      You can test if you have setup everything correctly by putting your Switch to sleep and waking it up.
    </p>
    <p>
        If everything is good, you should see IConnection on your lan-play client. It will look like 
<img src="https://cdn.discordapp.com/attachments/500786651526594598/743907525191008261/unknown.png" alt="IConnection" style="vertical-align:middle;margin:50px 650px" width="500" height="250">
       </p>
       <p> If you do not, verify your switch settings, ensure there is no autoconnect profile for a different wireless profile, and try rebooting your switch.
        <strong>
                Failing the internet and/or DNS connectivity test on your switch <b>DOES NOT MATTER</b> and can be ignored.
        </strong>
    </p>
    <p>
        If this continues to fail, join #help on the lan-play discord for further assistance.
    </p>
    <h2>5 - You can now play games that have the LAN play feature</h2>
    <p>
      Launch the desired game you want to play (Must have the LAN play feature!)
    </p>
    <p>
      You can find a list of games with the LAN play feature
      <a
        href="http://lan-play.com/games"
        target="_blank"
        rel="noreferrer noopener"
      >
        Here</a
      >.
    </p>
    <p>
      Then you have to enable the LAN mode ingame,
      <a
        href="https://en-americas-support.nintendo.com/app/answers/list/kw/Lan%20play%20feature/page/1/session/L3RpbWUvMTU4NzU1MDAyNi9nZW4vMTU4NzU1MDAyNi9zaWQvZlU2eTFZcVZyT0hhN082MjNiMnBJejVlS0tSZlhCZllKMnZCbUZzWlN0ZE1fYzhjRjhtb2lHNCU3RXc1UVRBY1VseFBndVZfNXRMcnpyN01KSFBRdjk5c0wlN0U0MWhQRHNWNlRoS0ROR2ZaS2htOXI4WmtubnR2a1VhUSUyMSUyMQ%3D%3D"
        target="_blank"
        rel="noreferrer noopener"
      >
        How to enable LAN play mode</a
      >.
    </p>
    <p>You should now be able to matchmake and play with other people.</p>
    <h2>
      6 - Download ldn_mitm to play non LAN supported games (Requires CFW)
    </h2>
    <p>
      You will need to download ldn_mitm if you wish to play to play games that
      don't have the lan play feature (Local Wireless mode Games).
    </p>
    <p>
      You can download the latest ldn_mitm
      <a
        href="https://github.com/spacemeowx2/ldn_mitm/releases"
        target="_blank"
        rel="noreferrer noopener"
      >
        Here</a
      >.
    </p>
    <p>
      After you downloaded it extract to the root of your SD card (Atmosphere/
      Reinx only) and the module should load on your next reboot.
    </p>
    <p>
      You already have ldn_mitm if you are using SXOS just go to SXOS menu then
      options and enable online play option.
    </p>
    <p>
      After that you just launch your game of choice and select local wireless
      play and you should be good to go.
    </p>
  </div>
</template>

<style lang="scss">
.screenshot {
  max-height: 400px;
  max-width: 100%;
}
</style>
