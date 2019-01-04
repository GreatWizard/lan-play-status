import Vue from "vue";
import Router from "vue-router";
import VueAnalytics from "vue-analytics";
import Home from "./views/Home.vue";
import Games from "./views/Games.vue";
import Download from "./views/Download.vue";
import Install from "./views/Install.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/games",
      name: "games",
      component: Games
    },
    {
      path: "/download",
      name: "download",
      component: Download
    },
    {
      path: "/install",
      name: "install",
      component: Install
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});

Vue.use(VueAnalytics, {
  id: "UA-128202561-1",
  router
});

export default router;
