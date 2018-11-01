<template>
  <div class="install">
    <h1>Install</h1>
    <h2>1 - Switch configuration</h2>
    <p>
      You need to manually edit the configuration of your local network with this informations.
    </p>
    <p>
      <em>Note: The IP address can be any from 10.13.0.1 to 10.13.255.254, excepting 10.13.37.1. But don't use the same IP address with your friend.</em>
    </p>
    <p>
      <code>
        <strong>IP Address Settings</strong><br>
          IP Address: 10.13.XX.YY<br>
          Subnet Mask: 255.255.0.0<br>
          Gatewway: 10.13.37.1<br>
        <br>
        <strong>DNS settings</strong><br>
          Primary DNS: 8.8.8.8<br>
          Secondary DNS: 8.8.4.4<br>
      </code>
    </p>
    <p>
      Please follow the screenshots:
    </p>
    <p>
      <img alt="Settings" class="screenshot" src="../assets/settings1.jpg">
    </p>
    <p>
      <img alt="Settings" class="screenshot" src="../assets/settings2.jpg">
    </p>
    <p>
      <img alt="Settings" class="screenshot" src="../assets/settings3.jpg">
    </p>
    <h2>2 - Computer configuration</h2>
    <h3>Windows</h3>
    <p>
      First, you need to install <a href="https://www.winpcap.org/install/default.htm" target="_blank">WinPcap
    </a>
    <p>
      Then double-click on <code>lan-play-win64.exe</code>.
    </p>
    <h3>MacOS</h3>
    <p>
      First, you need to install <a href="https://brew.sh" target="_blank">Homebrew</a>
    </p>
    <p>
      Then in a terminal:
      <code>brew install libpcap libuv</code>
    </p>
    <p>
      Finally in a terminal:
      <code>sudo ./lan-play-macos</code>
    </p>
    <h3>Ubuntu/Debian</h3>
    <p>
      In a terminal:
      <code>sudo apt install libpcap0.8-dev libuv1-dev</code>
    </p>
    <p>
      Finally in a terminal:
      <code>sudo ./lan-play-linux</code>
    </p>
    <h2>3 - Start the Lan Play Client</h2>
    <p>
      The application will prompt you to enter the relay server address. You can choose the server you want, like <code>35.236.10.223:11451</code>.
    </p>
    <p>
      Then, the application will prompt you to enter your switch's LAN "interface". You must choose the one that is connected to your router.
    </p>
    <h2>4 - Enjoy lan play on Switch</h2>
    <p>
      First, your must activate your wifi.
    </p>
    <p>
      Then start one game that suppports lan play.
    </p>
    <p>
      Here is the steps to activate lan mode in some games:
    </p>
    <p>
      <strong>Splatoon 2</strong>: Press [L] + [R] + [Left Analog] at the local play option. Hold down until the lan mode is activated.
    </p>
    <p>
      <strong>Mario Kart 8 Deluxe</strong>: Press [L] + [R] + [Left Analog] on the main menu screen.
    </p>
    <p>
      <strong>ARMS</strong>: Press [L] + [R] + [Left Analog] on the main menu screen.
    </p>
    <p>
      <strong>Mario Tennis</strong>: Select Free Play from the Main Menu. Press [Left Analog (hold down)] and press [L] + [R].
    </p>
    <p>
      <strong>Pokken Tournament DX</strong>: From the main screen select a game. Press [X] + [Dpad-Down] and press [L] + [R].
    </p>
  </div>
</template>

<style lang="scss">
.screenshot {
  height: 300px;
}
</style>
