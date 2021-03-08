<template>
  <div class="install">
    <h1>PS4 Install</h1>
    <h2>1 - PS4 configuration</h2>
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
        <strong>DNS settings (these are the Al Azif servers)</strong><br />
        Primary DNS: 165.227.83.145<br />
        Secondary DNS: 192.241.221.79<br />
      </code>
    </p>
    <p>Please follow the screenshots:</p>
    <p>
      <img
        alt="Settings"
        class="screenshot"
        :src="require(`@/assets/ps4/settings1.jpg`)"
      />
    </p>
    <p>
      <img
        alt="Settings"
        class="screenshot"
        :src="require(`@/assets/ps4/settings2.jpg`)"
      />
    </p>
    <p>
      <img
        alt="Settings"
        class="screenshot"
        :src="require(`@/assets/ps4/settings3.jpg`)"
      />
    </p>
    <p>
      <img
        alt="Settings"
        class="screenshot"
        :src="require(`@/assets/ps4/settings4.jpg`)"
      />
    </p>
    <Install type="ps4" />
  </div>
</template>

<script>
import Install from "@/components/Install.vue";

export default {
  components: {
    Install
  }
};
</script>
