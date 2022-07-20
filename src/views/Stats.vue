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
          <span>{{ getAccountInfo.id }}</span>
        </li>
        <li class="item">
          <p>referers:</p>
          <span>{{ getAccountInfo.referalCount }}</span>
        </li>
        <li class="item">
          <p>reward from tables:</p>
          <span>{{ getAccountInfo.paymant.table }}</span>
        </li>
        <li class="item">
          <p>reward from referers:</p>
          <span>{{ getAccountInfo.paymant.referal }}</span>
        </li>
      </ul>
      <ul class="block">
        <li class="item">
          <p>reinvest value:</p>
          <span>{{ getAccountInfo.paymant.pullDeposit }}</span>
        </li>
        <li class="item">
          <p>online:</p>
          <span>{{ getContractInfo.globalInfo.accountCount }}</span>
        </li>
        <li class="item">
          <p>Number of transactions:</p>
          <span>{{ getContractInfo.globalInfo.tableCount }}</span>
        </li>
        <li class="item">
          <p>total turnover:</p>
          <span>{{ getContractInfo.globalInfo.tableMoney }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "stats",
  data() {
    return {
      address: null,
    };
  },
  computed: {
    ...mapGetters(["getAccountInfo", "getContractInfo", "getError", "getResponse"]),
  },
  mounted() {
    if (typeof window.ethereum === "undefined") this.$router.push({name: "Home"});
    this.address = this.getAccountInfo.address;

    window.ethereum.on("accountsChanged", (accounts) => {
      this.address = accounts[0];
      this.init();
    });

    this.init();
  },
  methods: {

    // Init page
    async init() {
      await window.ethereum.request({method: "eth_requestAccounts"}).then((res) => {
        this.$store.dispatch("getAccountInfo", res[0]);
        this.address = res[0];
      });
      this.address = this.getAccountInfo.address;

      await this.$store.dispatch("clearAccountInfo");
      await this.$store.dispatch("getAccountInfo", this.address);

      if (!this.getAccountInfo.password) this.$router.push({name: "Home"});

      await this.getData();
    },

    async getData() {
      await this.$store.dispatch("getFullUserInfo", this.address);
      await this.$store.dispatch("getGlobalStat", this.address);

      await this.$store.dispatch("checkPassCount", {
        address: this.address,
        refCount: parseInt(this.getAccountInfo.referalCount),
        tableCount: this.getAccountInfo.tableCount,
      });
    },
  }
}
</script>