<template>
  <!-- Main container -->
  <div class="container container_main levelspage">
    <!-- First screen -->
    <div class="screen screen_levels">
      <!-- Screen title -->
      <div class="screen__title">
        <h1 class="title">Уровни</h1>
      </div>

      <ul class="list levels">
        <Card
          class="level-item"
          v-for="(card, index) in getContractInfo.cardData"
          :key="index"
          :cardData="card"
          @BUY-cardId="buyTableEvent"
          @REINVEST-cardId="reinvestCardEvent"
        ></Card>
      </ul>

      <!-- Background -->
      <img
        src="img/screens/7.png"
        alt="bg"
        class="background background_first"
      />
      <img
        src="img/screens/8.png"
        alt="bg"
        class="background background_second"
      />
    </div>
    <!-- Second screen -->
    <div class="screen screen_data">
      <div class="block-list">
        <ul class="block">
          <li class="item">
            <p>ID:</p>
            <span>{{ getContractInfo.accountInfo.id }}</span>
          </li>
          <li class="item">
            <p>referers:</p>
            <span>{{ getContractInfo.accountInfo.referalAddress }}</span>
          </li>
          <li class="item">
            <p>reward from tables:</p>
            <span>{{ getContractInfo.accountInfo.paymant.table }}</span>
          </li>
          <li class="item" style="margin-bottom: 15px">
            <p>reward from referers:</p>
            <span>{{ getContractInfo.accountInfo.paymant.referal }}</span>
          </li>
          <li class="item">
            <p>общий онлайн:</p>
            <span>{{ getContractInfo.globalInfo.accountCount }}</span>
          </li>
          <li class="item">
            <p>кол-во транзакций:</p>
            <span>{{ getContractInfo.globalInfo.tableCount }}</span>
          </li>
          <li class="item">
            <p>общий оборот:</p>
            <span>{{ getContractInfo.globalInfo.tableMoney }}</span>
          </li>
        </ul>
        <ul class="block">
          <li class="item">
            <p>reinvest value:</p>
            <span>{{ getContractInfo.accountInfo.paymant.pullDeposit }}</span>
          </li>
          <li class="item">
            <p>farming:</p>
            <span>100</span>
          </li>
          <li class="item">
            <p>reward from farming:</p>
            <span>{{ getContractInfo.accountInfo.paymant.pull }}</span>
          </li>
          <li class="item">
            <p>reward from partners:</p>
            <span>{{ getContractInfo.accountInfo.paymant.pullReferal }}</span>
          </li>
        </ul>
        <ul class="block info">
          <li class="item">
            <p>Referal Link:</p>
            <form class="form" @submit.prevent="copyReferal()">
              <input
                type="text"
                class="input"
                :value="referalLink"
                disabled
                id="referalLink"
              />
              <button class="button copy">Copy</button>
            </form>
          </li>
          <li class="item item-passwords">
            <p>Passwords:</p>
            <ul class="passwords">
              <li
                v-for="(pass, index) in this.getAccountInfo.password"
                :key="index"
              >
                <p>{{ pass }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Float picture -->
      <div class="float ufo">
        <img src="img/screens/ufo.png" alt="ufo" class="img" />
        <div class="bg"></div>
      </div>
      <!-- Background -->
      <img
        src="img/screens/9.png"
        alt="bg"
        class="background background_first"
      />
    </div>
  </div>
</template>

<script>
import Card from "./../components/Card.vue";
import { mapGetters } from "vuex";

export default {
  name: "levels",
  components: { Card },
  data() {
    return {
      // contract: {
      //   ViewAddress: process.env.VUE_APP_VIEW_ADDRESS,
      //   MatrixAddress: process.env.VUE_APP_MATRIX_ADDRESS,
      //   ReinvestAddress: process.env.VUE_APP_REINVEST_ADDRESS,
      //   ViewContract: null,
      //   MatrixContract: null,
      //   ReinvestContract: null,
      //   gasBuy: 900000,
      // },
    };
  },
  computed: { ...mapGetters(["getAccountInfo", "getContractInfo"]) },
  mounted() {
    this.init();
  },
  methods: {
    // Clicked
    buyTableEvent(value) {
      const tableInfo = [
        this.getAccountInfo.address,
        value.lvl,
        value.price,
        this.getAccountInfo.referalId,
      ];
      this.$store.dispatch("buyTable", tableInfo);
    },

    // Clicked
    reinvestCardEvent(value) {
      console.log("From the child2:", value);
    },

    // Copy
    copyReferal() {
      document.querySelector("#referalLink").select();
      try {
        document.execCommand("copy");
        alert("Ссылка успешно скопирована!");
      } catch (err) {
        console.log(err);
      }
    },

    // Init
    init() {
      const address = this.getAccountInfo.address;
      if (!this.getAccountInfo.address || typeof window.ethereum === undefined)
        this.$router.push({ name: "Home" });

      this.$store.dispatch("getFullUserInfo", address);
      this.$store.dispatch("getUserTableProgress", address);
      this.$store.dispatch("getUserLevels", address);
      this.$store.dispatch("getGlobalStat", address);

      // Create ref link
      this.referalLink = `${window.location.origin}/?referalId=${this.getAccountInfo.id}`;
    },
  },
  watch: {
    getAccountInfo() {
      this.init();
    },
  },
};
</script>
