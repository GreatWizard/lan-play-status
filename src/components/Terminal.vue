<template>
  <div class="terminal-container">
    <div class="terminal">
      <section class="terminal__bar">
        <p>{{ title }}</p>
      </section>
      <section class="terminal__body">
        <div class="terminal__body__content">
          {{ content }}
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String
  }
};
</script>

<style scoped lang="scss">
.terminal-container {
  display: flex;
  justify-content: center;

  .terminal {
    min-width: 400px;
    max-width: 710px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
  }

  .terminal__bar {
    display: flex;
    width: 100%;
    height: 25px;
    align-items: center;
    padding: 0 8px;
    box-sizing: border-box;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: linear-gradient(#504b45 0%, #3c3b37 100%);

    p {
      color: #d5d0ce;
      margin-left: 6px;
      font-size: 14px;
      line-height: 15px;
    }
  }

  .terminal__body {
    background: rgba(4, 46, 56, 0.9);
    font-family: Monospace;
    padding: 5px;
    padding-right: 20px;

    .terminal__body__content {
      display: flex;
      text-align: left;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}

@media screen and (prefers-color-scheme: light) {
  .terminal-container {
    .terminal__body {
      background: rgba(225, 235, 238, 0.9);
    }
  }
}
</style>
