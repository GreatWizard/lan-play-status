<template>
  <div class="install">
    <h1>{{ $t('pages.installPS4.title') }}</h1>
    <InstallConfig type="PS4" owner="Al Azif" primary="165.227.83.145" secondary="192.241.221.79" />
    <p>
      <img alt="Settings" class="screenshot" src="@/assets/ps4/settings1.jpg" />
    </p>
    <p>
      <img alt="Settings" class="screenshot" src="@/assets/ps4/settings2.jpg" />
    </p>
    <p>
      <img alt="Settings" class="screenshot" src="@/assets/ps4/settings3.jpg" />
    </p>
    <p>
      <img alt="Settings" class="screenshot" src="@/assets/ps4/settings4.jpg" />
    </p>
    <InstallSteps type="ps4" />
  </div>
</template>

<script>
import InstallConfig from '@/components/InstallConfig.vue'
import InstallSteps from '@/components/InstallSteps.vue'

export default {
  components: {
    InstallConfig,
    InstallSteps,
  },
}
</script>
