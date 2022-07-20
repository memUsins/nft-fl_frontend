<template>
  <div class="modal modal_agree block block_bg" :class="{ open: isOpen }">
    <h3 class="title">{{ $t("agreeTerms.title") }}</h3>
    <p class="description" v-html="$t('agreeTerms.text')"></p>
    <button class="button" @click="closeModal">{{ $t("agreeTerms.compete") }}</button>
  </div>
</template>

<script>
export default {
  name: "agree-modal",
  data() {
    return {
      isOpen: this.propIsOpen || false,
    };
  },
  props: ["propIsOpen"],
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$store.dispatch("setAgree", true);
    },
  },
};
</script>
