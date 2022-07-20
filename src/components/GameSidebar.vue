<template>
  <div class="game-sidebar-container" :class="{active: isOpen}">
    <div class="trigger" @click="sidebarToggle">
      <div class="bar left"></div>
      <div class="bar middle"></div>
      <div class="bar right"></div>
    </div>
    <div class="game-sidebar block block_bg">
      <router-link class="link" active-class="active" to="/levels">Уровни</router-link>
      <router-link class="link" active-class="active" to="/promo">Промо</router-link>
      <router-link class="link" active-class="active" to="/howuse">Как пользоваться</router-link>
      <router-link class="link" active-class="active" to="/stats">Статистика</router-link>
      <router-link class="link" active-class="active" to="/passwords">Пароли</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "game-sidebar",
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    let sidebar = document.querySelector(".game-sidebar");
    window.addEventListener("scroll", () => {

      if (window.pageYOffset >= 415) {
        sidebar.classList.add("fixed");
      } else sidebar.classList.remove("fixed");
    });
  },
  methods: {
    sidebarToggle: function () {
      this.isOpen = !this.isOpen;
      let body = document.querySelector("body");
      if (this.isOpen) {
        body.classList.add("disabled");
      } else body.classList.remove("disabled");
    }
  },
  watch: {
    $route: function () {
      this.sidebarToggle()
    }
  }
}
</script>