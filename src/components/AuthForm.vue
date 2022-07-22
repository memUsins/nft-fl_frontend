<template>
  <form class="auth-form form" @submit.prevent="register" v-if="getAccountInfo.webId === '0'">
    <button class="button button_gradient">
      {{ $t("connect") }}
    </button>
    <errorModal v-if="getError.msg === 'Metamask is not auth'" propIsOpen="true">
      {{ $t("error.isNotAuth") }}
    </errorModal>
    <errorModal v-if="getError.msg === 'User denied transaction signature'" propIsOpen="true">
      {{ $t("error.cancel") }}
    </errorModal>
    <agreeModal :propIsOpen="agreeOpen"></agreeModal>
  </form>
  <div class="auth-form form" v-else>
    <router-link to="/levels" class="button button_gradient">
      {{ $t("connect") }}
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import errorModal from "./Modals/ErrorModal";
import agreeModal from "./Modals/AgreeModal";

export default {
  name: "auth-form",
  data() {
    return {
      isLoading: true,
      agreeOpen: false,
    };
  },
  components: {errorModal, agreeModal},
  computed: {
    ...mapGetters(["getAccountInfo", "getError", "getResponse"]),
  },
  methods: {
    async register() {
      // Agree terms
      if (!this.getAccountInfo.isAgree) this.agreeOpen = true;
      else this.agreeOpen = false;

      // Metamask error
      if (!this.getAccountInfo.address) {
        this.$store.dispatch("setError", {
          name: "Metamask is not auth",
          msg: "Metamask is not auth",
          env: "metamask"
        });
      }

      // Register
      if (this.getAccountInfo.isAgree) {
        let referralId = localStorage.getItem("referralId") || this.$route.query.referralId || 0;

        await this.$store.dispatch("register", referralId);
        await this.$store.dispatch("getFullUserInfo");
        this.$router.push({name: "Home"})
      }
    },
  },
};
</script>
