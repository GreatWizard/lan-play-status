// import Vue from "vue";
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag-next";
import Konami from "./konami";

createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, {
    config: { id: "UA-128202561-1" }
  })
  .use(Konami, {
    callback: () => {
      let head = document.head || document.getElementsByTagName("head")[0];
      let style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(
        document.createTextNode(`body {
      cursor: url(data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxOCIgc3R5bGU9ImZvbnQtc2l6ZToxNHB4Ij48dGV4dCB5PSIxNiI+8J+mhDwvdGV4dD48L3N2Zz4=),
        auto;
    }`)
      );
      head.appendChild(style);
    }
  })
  .mount("#app");
