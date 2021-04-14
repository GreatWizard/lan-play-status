import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  { path: "/lobbies", component: () => import("@/views/Lobbies.vue") },
  { path: "/lobbies/:gameIds", component: () => import("@/views/Lobby.vue") },
  {
    // deprecated route
    path: "/games",
    name: "games",
    component: () => import("@/views/GamesSwitch.vue")
  },
  {
    path: "/games-switch",
    name: "games-switch",
    component: () => import("@/views/GamesSwitch.vue")
  },
  {
    path: "/games-ps4",
    name: "games-ps4",
    component: () => import("@/views/GamesPS4.vue")
  },
  {
    path: "/download",
    name: "download",
    component: () => import("@/views/Download.vue")
  },
  {
    // deprecated route
    path: "/install",
    name: "install",
    component: () => import("@/views/InstallSwitch.vue")
  },
  {
    path: "/install-switch",
    name: "install-switch",
    component: () => import("@/views/InstallSwitch.vue")
  },
  {
    path: "/install-ps4",
    name: "install-ps4",
    component: () => import("@/views/InstallPS4.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue")
  }
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
