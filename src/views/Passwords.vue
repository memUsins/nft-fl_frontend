<template>
  <!-- Second screen -->
  <div class="screen screen_data statspage">
    <div class="screen__title">
      <h1 class="title">{{ $t("pages.passwords.title") }}</h1>
    </div>
    <div class="block-list">
      <ul class="block info">
        <li class="item">
          <p>Referal Link:</p>
          <textarea type="text" class="passwords referal-link" :value="referalLink" disabled
                    id="referalLink"></textarea>
        </li>
        <li class="item item-passwords">
          <p>Passwords:</p>
          <ul class="passwords">
            <li v-for="(pass, index) in this.getAccountInfo.password" :key="index">
              <p>{{ pass }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "passwords",
  data() {
    return {
      referalLink: null,
      address: null,
    };
  },
  computed: {
    ...mapGetters(["getAccountInfo", "getContractInfo", "getError", "getResponse"]),
  },
  mounted() {
    if (typeof window.ethereum === "undefined") this.$router.push({name: "Home"});
    else {
      this.address = this.getAccountInfo.address;

      window.ethereum.on("accountsChanged", (accounts) => {
        this.address = accounts[0];
        this.init();
      });

      this.init();
    }
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
      // Create ref link
      this.referalLink = `${window.location.origin}/?referalId=${this.getAccountInfo.address}`;
    },

    async getData() {
      await this.$store.dispatch("getFullUserInfo", this.address);
      await this.$store.dispatch("getGlobalStat", this.address);
    },
  }
}
</script>