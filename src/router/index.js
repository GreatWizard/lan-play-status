import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Lobbies from "@/views/Lobbies.vue";
import Lobby from "@/views/Lobby.vue";
import GamesSwitch from "@/views/GamesSwitch.vue";
import GamesPS4 from "@/views/GamesPS4.vue";
import Download from "@/views/Download.vue";
import InstallSwitch from "@/views/InstallSwitch.vue";
import InstallPS4 from "@/views/InstallPS4.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  { path: "/lobbies", component: Lobbies },
  { path: "/lobbies/:gameIds", component: Lobby },
  {
    // deprecated route
    path: "/games",
    name: "games",
    component: GamesSwitch
  },
  {
    path: "/games-switch",
    name: "games-switch",
    component: GamesSwitch
  },
  {
    path: "/games-ps4",
    name: "games-ps4",
    component: GamesPS4
  },
  {
    path: "/download",
    name: "download",
    component: Download
  },
  {
    // deprecated route
    path: "/install",
    name: "install",
    component: InstallSwitch
  },
  {
    path: "/install-switch",
    name: "install-switch",
    component: InstallSwitch
  },
  {
    path: "/install-ps4",
    name: "install-ps4",
    component: InstallPS4
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
