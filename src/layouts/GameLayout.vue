<template>
  <div class="container container_empty">
    <div class="header-ui-controller">
      <div class="locale-header">
        <LocalePicker/>
      </div>
      <GameSidebar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import GameSidebar from "@/components/GameSidebar";
import LocalePicker from "@/components/LocalePicker";

export default {
  name: "game-layout",
  components: {GameSidebar, LocalePicker}
}
</script>