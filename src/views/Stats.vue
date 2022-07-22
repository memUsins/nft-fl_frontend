<template>
  <!-- Second screen -->
  <div class="screen screen_data statspage">
    <div class="screen__title">
      <h1 class="title">{{ $t("pages.stats.title") }}</h1>
    </div>
    <div class="block-list">
      <ul class="block">
        <li class="item">
          <p>ID:</p>
          <span>{{ getAccountInfo.webId }}</span>
        </li>
        <li class="item">
          <p>referers:</p>
          <span>{{ getAccountInfo.referralCount }}</span>
        </li>
        <li class="item">
          <p>reward from tables:</p>
          <span>{{ getAccountInfo.paymant.table }}</span>
        </li>
        <li class="item">
          <p>reward from referers:</p>
          <span>{{ getAccountInfo.paymant.referral }}</span>
        </li>
      </ul>
      <ul class="block">
        <li class="item">
          <p>reinvest value:</p>
          <span>{{ getAccountInfo.paymant.pullDeposit }}</span>
        </li>
        <li class="item">
          <p>online:</p>
          <span>{{ getGlobalInfo.accountCount }}</span>
        </li>
        <li class="item">
          <p>Number of transactions:</p>
          <span>{{ getGlobalInfo.tableCount }}</span>
        </li>
        <li class="item">
          <p>total turnover:</p>
          <span>{{ getGlobalInfo.tableMoney }}</span>
        </li>
      </ul>
    </div>
    <div class="loading overlay" v-show="isLoading">
      <div class="loader">
        <span class="a"></span>
        <span class="b spin">
          <span class="c"></span>
        </span>
      </div>
      {{ $t("loading") }}
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "stats",
  data() {
    return {
      isLoading: true,
      address: null,
    };
  },
  computed: {
    ...mapGetters(["getAccountInfo", "getAllInfo", "getGlobalInfo", "getError", "getResponse"]),
  },
  mounted() {
    if (typeof window.ethereum === "undefined") this.$router.push({name: "Home"});
    else {
      window.ethereum.on("accountsChanged", (accounts) => {
        this.address = accounts[0];
        this.init();
      });

      if (this.getAccountInfo.webId === '0') this.$router.push({name: "Home"});

      this.init();
    }
  },
  methods: {
    // Init page
    async init() {
      this.isLoading = true;

      await window.ethereum
          .request({method: "eth_requestAccounts"})
          .then((res) => this.address = res[0])
          .catch(() => this.$router.push({name: "Home"}));

      await this.getData();
    },

    async getData() {
      await this.$store.dispatch("getFullUserInfo", this.address);
      if (this.getAccountInfo.webId === '0') this.$router.push({name: "Home"});
      await this.$store.dispatch("getGlobalStat", this.address);
      this.isLoading = false;
    },
  }
}
</script>