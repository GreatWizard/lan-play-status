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
body {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(185, 203, 217);
  background-color: rgb(24, 26, 27);
}

a {
  font-weight: bold;
  color: rgb(220, 218, 212);
}

.icon {
  height: 22px;
}

// new modifier for VueFlags
.gb-flag {
  &--icon {
    height: 22px;
  }
}

.nav {
  padding: 30px;
  a {
    &.router-link-exact-active {
      color: rgb(255, 112, 67);
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
    background-color: rgb(0, 0, 0);
    background-color: hsla(0, 0%, 20%, 0.9);
    color: rgb(255, 255, 255);
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
    border-top: 5px solid rgb(0, 0, 0);
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

table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: 0px auto;
  td,
  th {
    border-bottom: 1px solid rgb(58, 58, 58);
    padding: 8px;
    text-align: center;
    font-size: 0.9rem;
    @media only screen and (max-width: 768px) {
      padding: 2px;
    }
  }
  tr.highlight {
    td {
      font-weight: bold;
    }
  }
  tr:nth-child(even) {
    background-color: rgb(28, 30, 31);
  }
  tr:hover {
    background-color: rgb(34, 36, 37);
  }
  th {
    padding: 12px;
    background-color: rgb(95, 67, 57);
    color: white;

    @media only screen and (max-width: 768px) {
      padding: 4px;
    }
  }
  td {
    .icon {
      vertical-align: middle;
    }
  }
}

button {
  background-color: rgb(24, 26, 27);
  color: rgb(232, 230, 227);
  border-color: rgb(87, 87, 87);
  border-radius: 4px;
}

@media screen and (max-width: 768px) {
  .hide--on-mobile {
    display: none;
  }
  .inline-block--on-mobile {
    display: block;
  }
}

@media screen and (prefers-color-scheme: light) {
  body {
    background-color: rgb(255, 255, 255);
    color: rgb(44, 62, 80);
  }
  a {
    color: rgb(33, 33, 33);
  }
  table {
    th,
    td {
      border-color: rgb(221, 221, 221);
    }
    tr:nth-child(even) {
      background-color: rgb(242, 242, 242);
    }
    tr:hover {
      background-color: rgb(221, 221, 221);
    }
  }
  button {
    background-color: rgb(255, 255, 255);
    color: rgb(33, 33, 33);
    border-color: rgb(87, 87, 87);
  }
}
</style>
