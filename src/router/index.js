import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Levels from "@/views/Levels";
import Promo from "@/views/Promo";
import HowUse from "@/views/HowUse";
import Stats from "@/views/Stats";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "main",
    },
    component: Home,
  },
  {
    path: "/levels",
    name: "Levels",
    meta: {
      layout: "game",
    },
    component: Levels,
  },
  {
    path: "/promo",
    name: "Promo",
    meta: {
      layout: "game",
    },
    component: Promo,
  },
  {
    path: "/howuse",
    name: "HowUse",
    meta: {
      layout: "game",
    },
    component: HowUse,
  },
  {
    path: "/stats",
    name: "Stats",
    meta: {
      layout: "game",
    },
    component: Stats,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
