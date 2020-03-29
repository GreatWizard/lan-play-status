<template>
  <div class="app">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/games">Games</router-link> |
      <router-link to="/download">Download</router-link> |
      <router-link to="/install">Install</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.app {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #212121;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.icon {
  width: 22px;
  &--spin {
    width: 12px;
    animation-name: spin;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}

.nav {
  padding: 30px;
  a {
    &.router-link-exact-active {
      color: #ff7043;
    }
  }
}

$tooltip-bottom: 80%;
[data-tooltip] {
  position: relative;
  z-index: 2;
  cursor: pointer;
  /* Hide the tooltip content by default */
  &:before,
  &:after {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  }
  /* Position tooltip above the element */
  &:before {
    position: absolute;
    bottom: $tooltip-bottom;
    left: 50%;
    margin-bottom: 5px;
    margin-left: -80px;
    padding: 4px;
    width: 140px;
    border-radius: 4px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  } /* Triangle hack to make tooltip look like a speech bubble */
  &:after {
    position: absolute;
    bottom: $tooltip-bottom;
    left: 50%;
    margin-left: -5px;
    width: 0;
    border-top: 5px solid #000;
    border-top: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  } /* Show tooltip content on hover */
  &:hover:before,
  &:hover:after {
    visibility: visible;
    opacity: 1;
  }
}
</style>
