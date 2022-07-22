<template>
  <!-- Main container -->
  <div class="container container_main levelspage">
    <!-- First screen -->
    <div class="screen screen_levels">
      <!-- Screen title -->
      <div class="screen__title">
        <h1 class="title">{{ $t("pages.levels.title") }}</h1>
      </div>

      <ul class="list levels">
        <Card
            class="level-item"
            v-for="(card, index) in getAllInfo.cards"
            :key="index"
            :cards="card"
            @BUY-cardId="buyTableEvent"
            @REINVEST-cardId="reinvestCardEvent"
        ></Card>

        <SuccessModal :propIsOpen="true" v-if="getResponse">
          {{ $t("success.tablePurchased") }}
        </SuccessModal>
        <ErrorModal v-if="getError.msg === 'Level already active'" :propIsOpen="true">
          {{ $t("error.tableIsPurchased") }}
        </ErrorModal>
        <ErrorModal v-if="getError.msg === 'User denied transaction signature'" :propIsOpen="true">
          {{ $t("error.cancel") }}
        </ErrorModal>
        <ErrorModal v-if="getError.msg === 'Unknown account'" :propIsOpen="true">
          {{ $t("error.unknownAccount") }}
        </ErrorModal>
        <ErrorModal v-if="getError.msg === 'All previous levels must be active'" :propIsOpen="true">
          {{ $t("error.previousTable") }}
        </ErrorModal>
        <ErrorModal v-if="getError.msg === 'Not enoight token'" :propIsOpen="true">
          {{ $t("error.notEnoightToken") }}
        </ErrorModal>
      </ul>

      <!-- Background -->
      <img src="img/screens/7.webp" alt="bg" class="background background_first"/>
      <img src="img/screens/8.webp" alt="bg" class="background background_second"/>
    </div>
    <!-- Second screen -->
    <div class="screen screen_data">
      <div class="block-list">
        <ul class="block">
          <li class="item">
            <p>ID:</p>
            <span>{{ getAccountInfo.webId }}</span>
          </li>
          <li class="item">
            <p>{{ $t("stats.referrers") }}:</p>
            <span>{{ getAccountInfo.referralCount }}</span>
          </li>
          <li class="item">
            <p>{{ $t("stats.rewardTable") }}:</p>
            <span>{{ getAccountInfo.paymant.table }}</span>
          </li>
          <li class="item">
            <p>{{ $t("stats.rewardReferrers") }}:</p>
            <span>{{ getAccountInfo.paymant.referral }}</span>
          </li>
        </ul>
        <ul class="block">
          <li class="item">
            <p>{{ $t("stats.reinvest") }}:</p>
            <span>{{ getAccountInfo.paymant.pullDeposit }}</span>
          </li>
          <li class="item">
            <p>{{ $t("stats.online") }}:</p>
            <span>{{ getGlobalInfo.accountCount }}</span>
          </li>
          <li class="item">
            <p>{{ $t("stats.transactionNumber") }}:</p>
            <span>{{ getGlobalInfo.tableCount }}</span>
          </li>
          <li class="item">
            <p>{{ $t("stats.turnover") }}:</p>
            <span>{{ getGlobalInfo.tableMoney }}</span>
          </li>
        </ul>
        <ul class="block info">
          <li class="item">
            <p>Referral Link:</p>
            <textarea
                type="text"
                class="passwords referral-link"
                :value="referralLink"
                disabled
                id="referralLink"
            ></textarea>
          </li>
        </ul>
      </div>
      <!-- Float picture -->
      <div class="float ufo">
        <img src="img/screens/ufo.webp" alt="ufo" class="img"/>
        <div class="bg"></div>
      </div>
      <!-- Background -->
      <img src="img/screens/9.webp" alt="bg" class="background background_first"/>
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
import Card from "@/components/Card.vue";
import SuccessModal from "@/components/Modals/SuccessModal.vue";
import ErrorModal from "@/components/Modals/ErrorModal.vue";
import {mapGetters} from "vuex";

export default {
  name: "levels",
  components: {Card, SuccessModal, ErrorModal},
  data() {
    return {
      isLoading: true,
      referralLink: null,
      address: null,
    };
  },
  computed: {
    ...mapGetters(["getAllInfo", "getAccountInfo", "getGlobalInfo", "getError", "getResponse"]),
  },
  mounted() {
    if (typeof window.ethereum === "undefined") this.$router.push({name: "Home"});
    else {
      this.init();

      window.ethereum.on("accountsChanged", (accounts) => {
        this.address = accounts[0];
        this.init();
      });
    }

    setInterval(async () => {
      await this.$store.dispatch("getFullUserInfo", this.address);
      await this.$store.dispatch("getUserLevels", this.address);
      await this.$store.dispatch("getUserTableProgress", this.address);
      await this.$store.dispatch("getGlobalStat", this.address);
      await this.$store.dispatch("getPullsInfo", this.address);
      await this.activedTable();
    }, 5000);
  },
  methods: {
    // Clicked
    async buyTableEvent(value) {
      if (value.isActive && this.getAllInfo.cards[value.lvl].isActive) {
        this.$store.dispatch("setError", {
          msg: "Level already active",
          name: "Level already active",
          env: "Chain",
        });
        return;
      }

      const tableInfo = {
        lvl: value.lvl,
        price: value.price,
        referralId: this.getAccountInfo.referralId,
      };

      await this.$store.dispatch("buyTable", tableInfo);

      if (!this.getError.msg) this.getData();
    },

    // Clicked
    async reinvestCardEvent(value) {
      const tableInfo = {
        lvl: value.lvl,
      };

      await this.$store.dispatch("reinvest", tableInfo);

      if (!this.getError.msg) this.getData();
    },

    // Set active status for table
    activedTable() {
      let tables = this.getAllInfo.cards;

      if (!tables[0].isActived) {
        this.$store.dispatch("activeTable", {lvl: 1, isActive: true});
      }
    },

    // Init page
    async init() {
      this.isLoading = true;

      await window.ethereum
          .request({method: "eth_requestAccounts"})
          .then((res) => this.address = res[0])
          .catch(() => this.$router.push({name: "Home"}));

      await this.getData();

      // Create ref link
      this.referralLink = `${window.location.origin}/?referralId=${this.getAccountInfo.address}`;
    },

    async getData() {
      await this.$store.dispatch("getFullUserInfo", this.address);

      if (this.getAccountInfo.webId === '0') this.$router.push({name: "Home"});
      await this.$store.dispatch("getUserLevels", this.address);
      await this.$store.dispatch("getUserTableProgress", this.address);
      await this.$store.dispatch("getGlobalStat", this.address);
      await this.$store.dispatch("getPullsInfo", this.address);
      await this.activedTable();

      this.isLoading = false;
    },
  },
};
</script>
