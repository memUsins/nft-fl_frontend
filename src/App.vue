<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";
import Cookies from "js-cookie";

export default {
  name: "home",
  mounted() {
    if (window.ethereum) {
      window.ethereum.request({method: "eth_requestAccounts"}).then(async (res) => {
        await this.$store.dispatch("getAccountInfo", res[0]);
      });
    }

    if (Cookies.get("isAgree")) this.$store.dispatch("setAgree", true);
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: {EmptyLayout, MainLayout},
  watch: {
    "$i18n.locale": function (newVal) {
      localStorage.setItem("last-locale", newVal);
    },
  },
};
</script>

<style lang="less">
@import "assets/main.less";
</style>
