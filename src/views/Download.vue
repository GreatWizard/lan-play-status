<template>
  <div class="download">
    <h1>{{ $t("pages.download.title") }}</h1>
    <h2>{{ $t("pages.download.client.title") }}</h2>
    <p>
      <a :href="ldnMitmWin64Link" target="=_blank" rel="noreferrer noopener">
        {{ $t("pages.download.client.windows64") }} {{ ldnMitmVersion }}
      </a>
    </p>
    <p>
      <a :href="ldnMitmMacOSLink" target="=_blank" rel="noreferrer noopener">
        {{ $t("pages.download.client.macos") }} {{ ldnMitmVersion }}
      </a>
    </p>
    <p>
      <a :href="ldnMitmLinuxLink" target="=_blank" rel="noreferrer noopener">
        {{ $t("pages.download.client.linux") }} {{ ldnMitmVersion }}
      </a>
    </p>
    <p>
      <a :href="ldnMitmWin32Link" target="=_blank" rel="noreferrer noopener">
        {{ $t("pages.download.client.windows32") }} {{ ldnMitmWin32Version }}
      </a>
    </p>
    <h2>{{ $t("pages.download.switchModule.title") }}</h2>
    <p>
      {{ $t("pages.download.switchModule.text") }}
      <a
        href="https://github.com/spacemeowx2/ldn_mitm#version-table"
        target="=_blank"
        rel="noreferrer noopener"
      >
        https://github.com/spacemeowx2/ldn_mitm#version-table
      </a>
    </p>
    <em>{{ $t("pages.download.switchModule.sxos") }}</em>
  </div>
</template>

<script>
import { ldnMitmVersion, ldnMitmWin32Version } from "@/config";

export default {
  data() {
    return {
      ldnMitmVersion,
      ldnMitmWin32Version
    };
  },
  computed: {
    ldnMitmWin64Link() {
      return `https://github.com/spacemeowx2/switch-lan-play/releases/download/${ldnMitmVersion}/lan-play-win64.exe`;
    },
    ldnMitmMacOSLink() {
      return `https://github.com/spacemeowx2/switch-lan-play/releases/download/${ldnMitmVersion}/lan-play-macos`;
    },
    ldnMitmLinuxLink() {
      return `https://github.com/spacemeowx2/switch-lan-play/releases/download/${ldnMitmVersion}/lan-play-linux`;
    },
    ldnMitmWin32Link() {
      return `https://github.com/spacemeowx2/switch-lan-play/releases/download/${ldnMitmWin32Version}/lan-play-win32.exe`;
    }
  }
};
</script>
