<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  mounted() {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        this.$store.dispatch("getAccountInfo", res[0]);
        this.redirect();
      });
    }
  },
  computed: {
    ...mapGetters(["getAccountInfo"]),
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  methods: {
    redirect() {
      if (this.getAccountInfo.id) this.$router.push({ name: "Levels" });
      // if (this.getAccountInfo.password) console.log("redirect");
    },
  },
  watch: {
    getAccountInfo() {
      this.redirect();
    },
  },
  components: { EmptyLayout, MainLayout },
};
</script>

<style lang="less">
@import "assets/main.less";
</style>
