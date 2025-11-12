<template>
  <div class="about">
    <h1>{{ $t('pages.about.title') }}</h1>
    <h2>{{ $t('pages.about.client.title') }}</h2>
    <p>{{ $t('pages.about.client.text') }}</p>
    <p>
      <a href="https://discordapp.com/invite/zEMCu5n" target="=_blank" rel="noreferrer noopener">
        {{ $t('general.discord') }}
      </a>
    </p>
    <p>
      <a
        href="https://github.com/spacemeowx2/switch-lan-play"
        target="=_blank"
        rel="noreferrer noopener"
      >
        {{ $t('pages.about.client.clientGithub') }}
      </a>
    </p>
    <p>
      <a href="https://github.com/spacemeowx2/ldn_mitm" target="=_blank" rel="noreferrer noopener">
        {{ $t('pages.about.client.ldnmitmGithub') }}
      </a>
    </p>
  </div>
</template>
