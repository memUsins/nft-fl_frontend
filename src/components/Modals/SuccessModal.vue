<template>
  <div class="modal block block_bg" :class="{ open: isOpen }">
    <h3 class="title">Успешно!</h3>
    <p class="description">
      <slot></slot>
    </p>
    <span class="close" @click="closeModal">X</span>
  </div>
</template>

<script>
export default {
  name: "error-modal",
  data() {
    return {
      isOpen: this.propIsOpen || false,
    };
  },
  props: ["propIsOpen"],
  watch: {
    propIsOpen: function () {
      this.isOpen = this.propIsOpen;
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$store.dispatch("setResponse", null);
    },
  },
};
</script>