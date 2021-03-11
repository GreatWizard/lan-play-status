<template>
  <div class="download">
    <h1>{{ $t("pages.download.title") }}</h1>
    <h2>{{ $t("pages.download.client.title") }}</h2>
    <p>
      <a
        href="https://github.com/spacemeowx2/switch-lan-play/releases/download/v0.2.3/lan-play-win64.exe"
        target="=_blank"
        rel="noreferrer noopener"
      >
        {{ $t("pages.download.client.windows64") }} v0.2.3
      </a>
    </p>
    <p>
      <a
        href="https://github.com/spacemeowx2/switch-lan-play/releases/download/v0.2.3/lan-play-macos"
        target="=_blank"
        rel="noreferrer noopener"
      >
        {{ $t("pages.download.client.macos") }} v0.2.3
      </a>
    </p>
    <p>
      <a
        href="https://github.com/spacemeowx2/switch-lan-play/releases/download/v0.2.3/lan-play-linux"
        target="=_blank"
        rel="noreferrer noopener"
      >
        {{ $t("pages.download.client.linux") }} v0.2.3
      </a>
    </p>
    <p>
      <a
        href="https://github.com/spacemeowx2/switch-lan-play/releases/download/v0.2.1/lan-play-win32.exe"
        target="=_blank"
        rel="noreferrer noopener"
      >
        {{ $t("pages.download.client.windows32") }} v0.2.1
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
