<template>
  <div class="is-have-ethereum" v-if="!isEthereum">
    <p v-html="$t('error.isNotMetamask')"></p>
  </div>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";
import GameLayout from "@/layouts/GameLayout";
import Cookies from "js-cookie";

export default {
  name: "home",
  data() {
    return {
      isEthereum: false,
    };
  },
  mounted() {
    if (typeof window.ethereum !== "undefined") this.isEthereum = true;
    if (window.ethereum) {
      window.ethereum.request({method: "eth_requestAccounts"}).then(async (res) => {
        await this.$store.dispatch("getAccountInfo", res[0]);
      }).catch(() => this.$router.push({name: "Home"}));
    }

    if (Cookies.get("isAgree")) this.$store.dispatch("setAgree", true);
  },
  beforeUpdate() {
    this.setReferalId();
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  methods: {
    setReferalId() {
      if (this.$route.query.referalId && !localStorage.getItem("referalId")) {
        localStorage.setItem("referalId", this.$route.query.referalId);
      }
    },
    setTitle() {
      let title = this.$route.name.toLowerCase();
      document.title = this.$t(`pages.${title}.pageTitle`);
    },
  },
  watch: {
    "$i18n.locale": function (newVal) {
      localStorage.setItem("last-locale", newVal);
      this.setTitle();
    },
    $route: function () {
      this.setTitle();
    }
  },
  components: {EmptyLayout, MainLayout, GameLayout},
};
</script>

<style lang="less">
@import "assets/main.less";
</style>
