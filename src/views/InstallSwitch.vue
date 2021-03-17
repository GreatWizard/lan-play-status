<template>
  <div class="install">
    <h1>{{ $t("pages.installSwitch.title") }}</h1>
    <InstallConfig
      type="Switch"
      owner="90DNS"
      primary="163.172.141.219"
      secondary="207.246.121.77"
    />
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
    <Install type="switch" />
    <h2>{{ $t("pages.installSwitch.module.title", { prefix: "5 - " }) }}</h2>
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
        here</a
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
    <h2>{{ $t("pages.installSwitch.test.title", { prefix: "6 - " }) }}</h2>
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
  </div>
</template>

<script>
import InstallConfig from "@/components/InstallConfig.vue";
import Install from "@/components/Install.vue";

export default {
  components: {
    InstallConfig,
    Install
  }
};
</script>
