<template>
  <form class="auth-form form" @submit.prevent="register" v-if="!getAccountInfo.id">
    <input type="text" name="password" class="input" :placeholder="$t('enterPass')" :class="checkPass"
           v-model="password"/>

    <button class="button button_gradient" :disabled="checkPass.error">
      {{ $t("connect") }}
    </button>
    <div v-if="loginError" class="modal">
      <h3>{{ $t("errorTitle") }}!</h3>
      <p>{{ $t("error.isNotAuth") }}!</p>
    </div>
    <errorModal v-if="getError.name === 'ADDRESS_USED'" propIsOpen="true">
      {{ $t("error.addressExist") }}
    </errorModal>
    <errorModal v-if="getError.name === 'PASSWORD_USED'" propIsOpen="true">
      {{ $t("error.passUsed") }}
    </errorModal>
    <errorModal v-if="getError.name === 'PASSWORD_NOT_FOUND'" propIsOpen="true">
      {{ $t("error.noSuchPass") }}
    </errorModal>
    <errorModal v-if="getError.msg === 'User denied transaction signature'" propIsOpen="true">
      {{ $t("error.cancel") }}
    </errorModal>
    <agreeModal :propIsOpen="agreeOpen"></agreeModal>
  </form>
  <div v-else>
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
      password: null,
      loginError: false,
      agreeOpen: false,
      isDisabled: false,
    };
  },
  components: {errorModal, agreeModal},
  computed: {
    ...mapGetters(["getAccountInfo", "getError", "getResponse"]),

    checkPass() {
      return {
        error: this.password !== null && !this.password,
      };
    },
  },
  methods: {
    async register() {
      if (!this.password) return (this.password = "");
      this.isDisabled = true;

      if (!this.getAccountInfo.isAgree) this.agreeOpen = true;
      else this.agreeOpen = false;

      if (!this.getAccountInfo.address) {
        this.isDisabled = false;
        return (this.loginError = true);
      }

      if (this.getAccountInfo.isAgree) {
        await this.$store.dispatch("checkPassword", this.password);

        if (this.getResponse !== null && this.getError.msg === null) {
          await this.$store.dispatch("clearResponse");
          let data = {
            password: this.password,
            referalId: this.$route.query.referalId || 0,
          };

          await this.$store.dispatch("register", data);

          // if (this.getAccountInfo.id) this.$router.push({name: "Levels"});
        }
      }

      this.isDisabled = false;
    },
  },
};
</script>
