import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LobbiesView from '@/views/LobbiesView.vue'
import LobbyView from '@/views/LobbyView.vue'
import GamesSwitch from '@/views/GamesSwitch.vue'
import GamesPS4 from '@/views/GamesPS4.vue'
import DownloadView from '@/views/DownloadView.vue'
import InstallSwitch from '@/views/InstallSwitch.vue'
import InstallPS4 from '@/views/InstallPS4.vue'
import AboutView from '@/views/AboutView.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/lobbies', component: LobbiesView },
  { path: '/lobbies/:gameIds', component: LobbyView },
  {
    // deprecated route
    path: '/games',
    name: 'games',
    component: GamesSwitch,
  },
  {
    path: '/games-switch',
    name: 'games-switch',
    component: GamesSwitch,
  },
  {
    path: '/games-ps4',
    name: 'games-ps4',
    component: GamesPS4,
  },
  {
    path: '/download',
    name: 'download',
    component: DownloadView,
  },
  {
    // deprecated route
    path: '/install',
    name: 'install',
    component: InstallSwitch,
  },
  {
    path: '/install-switch',
    name: 'install-switch',
    component: InstallSwitch,
  },
  {
    path: '/install-ps4',
    name: 'install-ps4',
    component: InstallPS4,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
