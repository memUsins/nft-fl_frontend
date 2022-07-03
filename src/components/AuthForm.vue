<template>
  <form class="auth-form form" @submit.prevent="register">
    <input
      type="text"
      name="password"
      class="input"
      placeholder="Введите пароль"
      :class="checkPass"
      v-model="password"
    />
    <button class="button button_gradient" :disabled="checkPass.error">
      Подключиться
    </button>
    <div v-if="loginError" class="modal">
      <h3>Ошибка!</h3>
      <p>Вы не авторизованы!</p>
    </div>
    <errorModal v-if="getError.name == 'ADDRESS_USED'" propIsOpen="true"
      >Аккаунт с таким адресом существует
    </errorModal>
    <errorModal v-if="getError.name == 'PASSWORD_USED'" propIsOpen="true">
      Данный пароль уже активирован
    </errorModal>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import errorModal from "./ErrorModal";

export default {
  name: "auth-form",
  data() {
    return {
      password: null,
      loginError: false,
    };
  },
  components: { errorModal },
  computed: {
    ...mapGetters(["getAccountInfo", "getError"]),
    checkPass() {
      return {
        error: this.password !== null && !this.password,
      };
    },
  },
  methods: {
    async register() {
      if (!this.password) return (this.password = "");
      if (!this.getAccountInfo.address) return (this.loginError = true);

      let data = {
        password: this.password,
        referalId: this.$route.query.referalId || 0,
      };

      this.$store.dispatch("register", data);
    },
  },
  watch: {
    getError() {
      if (this.getError.name == "ADDRESS_USED") {
        this.$store.dispatch("getAccountInfo", this.getAccountInfo.address);
        if (this.getAccountInfo.password) this.$router.push({ name: "Levels" });
      }
    },
  },
};
</script>