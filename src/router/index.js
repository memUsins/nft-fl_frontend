import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";
import Levels from "@/views/Levels";
import Promo from "@/views/Promo";
import HowUse from "@/views/HowUse";
import Stats from "@/views/Stats";
import Passwords from "@/views/Passwords";
import i18n from '@/translate';

const {t} = i18n.global

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "main",
      title: t("pages.home.pageTitle"),
    },
    component: Home,
  },
  {
    path: "/levels",
    name: "Levels",
    meta: {
      layout: "game",
      title: t("pages.levels.pageTitle"),
    },
    component: Levels,
  },
  {
    path: "/promo",
    name: "Promo",
    meta: {
      layout: "game",
      title: t("pages.promo.pageTitle"),
    },
    component: Promo,
  },
  {
    path: "/howuse",
    name: "HowUse",
    meta: {
      layout: "game",
      title: t("pages.promo.pageTitle"),
    },
    component: HowUse,
  },
  {
    path: "/stats",
    name: "Stats",
    meta: {
      layout: "game",
      title: t("pages.promo.pageTitle"),
    },
    component: Stats,
  },
  {
    path: "/passwords",
    name: "Passwords",
    meta: {
      layout: "game",
      title: t("pages.promo.pageTitle"),
    },
    component: Passwords,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
