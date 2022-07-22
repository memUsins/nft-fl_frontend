<template>
  <div class="game-sidebar-container" :class="{active: isOpen}">
    <div class="trigger" @click="sidebarToggle">
      <div class="bar left"></div>
      <div class="bar middle"></div>
      <div class="bar right"></div>
    </div>
    <div class="game-sidebar block block_bg">
      <router-link class="link" active-class="active" to="/levels">{{ $t("pages.levels.title") }}</router-link>
      <router-link class="link" active-class="active" to="/promo">{{ $t("pages.promo.title") }}</router-link>
      <router-link class="link" active-class="active" to="/howuse">{{ $t("pages.howuse.link") }}</router-link>
      <router-link class="link" active-class="active" to="/stats">{{ $t("pages.stats.title") }}</router-link>
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
    },
    sidebarClose: function () {
      this.isOpen = false;
      let body = document.querySelector("body");
      body.classList.remove("disabled");
    }
  },
  watch: {
    $route: function () {
      this.sidebarClose()
    }
  }
}
</script>