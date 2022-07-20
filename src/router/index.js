import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import i18n from './../translate';

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
    component: () => import("../views/Levels.vue"),
  },
  {
    path: "/promo",
    name: "Promo",
    meta: {
      layout: "game",
      title: t("pages.promo.pageTitle"),
    },
    component: () => import("../views/Promo.vue"),
  },
  {
    path: "/howuse",
    name: "HowUse",
    meta: {
      layout: "game",
      title: t("pages.promo.pageTitle"),
    },
    component: () => import("../views/Promo.vue"),
  },
  {
    path: "/stats",
    name: "Stats",
    meta: {
      layout: "game",
      title: t("pages.promo.pageTitle"),
    },
    component: () => import("../views/Promo.vue"),
  },
  {
    path: "/passwords",
    name: "Passwords",
    meta: {
      layout: "game",
      title: t("pages.promo.pageTitle"),
    },
    component: () => import("../views/Promo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
