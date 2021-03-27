<template>
  <h2>
    {{ $t("install.configuration.title", { prefix: "1 - ", type: this.type }) }}
  </h2>
  <p>{{ $t("install.configuration.text") }}</p>
  <p>
    <em>{{
      $t("install.configuration.note", {
        start: "10.13.255.1",
        end: "10.13.255.254",
        gateway: "10.13.37.1"
      })
    }}</em>
  </p>
  <pre><strong>{{ $t("install.configuration.settings.ip.title") }}</strong
      >
{{
        $t("install.configuration.settings.ip.address", {
          address: "10.13.XX.YY"
        })
}}
{{
        $t("install.configuration.settings.ip.mask", {
          address: "255.255.0.0"
        })
}}
{{
        $t("install.configuration.settings.ip.gateway", {
          address: "10.13.37.1"
        })
}}

<strong>{{
$t("install.configuration.settings.dns.title", { owner: this.owner })
}}</strong
      >
{{
        $t("install.configuration.settings.dns.primary", {
          address: this.primary
        })
}}
{{
        $t("install.configuration.settings.dns.secondary", {
          address: this.secondary
        })
}}</pre>
  <p>{{ $t("install.configuration.screenshots") }}</p>
</template>

<script>
export default {
  props: {
    type: String,
    owner: String,
    primary: String,
    secondary: String
  }
};
</script>
