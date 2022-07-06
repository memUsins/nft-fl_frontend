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
          :isLoading="cardLoading"
          @BUY-cardId="buyTableEvent"
          @REINVEST-cardId="reinvestCardEvent"
        ></Card>
        <SuccessModal :propIsOpen="getContractInfo.contractResponse">
          Стол был успешно куплен!
        </SuccessModal>
        <ErrorModal
          v-if="getError.msg === 'Level already active'"
          :propIsOpen="true"
        >
          Стол уже куплен!
        </ErrorModal>
        <ErrorModal
          v-if="getError.msg === 'User denied transaction signature'"
          :propIsOpen="true"
        >
          Операция была отменена, покупка не произведена!
        </ErrorModal>
        <ErrorModal
          v-if="getError.msg === 'Unknown account'"
          :propIsOpen="true"
        >
          Неизвестный аккаунт! Пожалуйста, выберите другой аккаунт!
        </ErrorModal>
        <ErrorModal
          v-if="getError.msg === 'All previous levels must be active'"
          :propIsOpen="true"
        >
          Все предыдущие столы должны быть куплены!
        </ErrorModal>
        <ErrorModal
          v-if="getError.msg === 'Not enoight token'"
          :propIsOpen="true"
        >
          Недостаточно средств для реинвеста!
        </ErrorModal>
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
    <div class="loading overlay" v-show="isLoading">
      <div class="loader">
        <span class="a"></span>
        <span class="b spin">
          <span class="c"></span>
        </span>
      </div>
      Загрузка, пожалуйста, подождите..
    </div>
  </div>
</template>

<script>
import Card from "./../components/Card.vue";
import SuccessModal from "./../components/SuccessModal.vue";
import ErrorModal from "./../components/ErrorModal.vue";

import { mapGetters } from "vuex";

export default {
  name: "levels",
  components: { Card, SuccessModal, ErrorModal },
  data() {
    return {
      isLoading: true,
      cardLoading: true,
      referalLink: null,
      address: null,
    };
  },
  created() {
    document.title = this.$route.meta.title;
  },
  computed: {
    ...mapGetters(["getAccountInfo", "getContractInfo", "getError"]),
  },
  mounted() {
    if (typeof window.ethereum === "undefined")
      this.$router.push({ name: "Home" });

    this.address = this.getAccountInfo.address;

    window.ethereum.on("accountsChanged", (accounts) => {
      this.address = accounts[0];
      this.init();
    });

    this.init();
  },
  methods: {
    // Clicked
    async buyTableEvent(value) {
      const tableInfo = {
        lvl: value.lvl,
        price: value.price,
        referalId: this.getAccountInfo.referalId,
      };

      await this.$store.dispatch("buyTable", tableInfo);

      this.cardLoading = true;
      if (!this.getError.msg) this.getData();
      else this.cardLoading = false;
    },

    // Clicked
    async reinvestCardEvent(value) {
      const tableInfo = {
        lvl: value.lvl,
      };

      await this.$store.dispatch("reinvest", tableInfo);

      this.cardLoading = true;
      if (!this.getError.msg) this.getData();
      else this.cardLoading = false;
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

    activedTable() {
      let tables = this.getContractInfo.cardData;

      if (!tables[0].isActived) {
        this.$store.dispatch("activeTable", { lvl: 1, status: true });
      }
    },

    // Init
    async init() {
      this.cardLoading = true;
      this.isLoading = true;

      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          this.$store.dispatch("getAccountInfo", res[0]);
          this.address = res[0];
        });

      await this.$store.dispatch("clearAccountInfo");
      await this.$store.dispatch("getAccountInfo", this.address);

      if (!this.getAccountInfo.password) this.$router.push({ name: "Home" });

      this.getData();
      // Create ref link
      this.referalLink = `${window.location.origin}/?referalId=${this.getAccountInfo.address}`;
    },

    async getData() {
      await this.$store.dispatch("getFullUserInfo", this.address);
      await this.$store.dispatch("getUserLevels", this.address);
      await this.$store.dispatch("checkPassCount", {
        address: this.address,
        refCount: this.getAccountInfo.referalCount,
        tableCount: this.getAccountInfo.tableCount,
      });
      await this.$store.dispatch("getUserTableProgress", this.address);
      await this.$store.dispatch("getGlobalStat", this.address);
      await this.$store.dispatch("GetPullsInfo", this.address);
      await this.activedTable();

      this.isLoading = false;
      this.cardLoading = false;
    },
  },
};
</script>
