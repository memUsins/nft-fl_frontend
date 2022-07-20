<template>
  <div class="game-layout-content block">
    <div class="screen__title">
      <h1 class="title">{{ $t("pages.howuse.title") }}</h1>
    </div>

    <div class="block" v-html="$t('pages.howuse.textOne')"></div>

    <img src="img/guide/1.webp" alt="metamask">
    <img src="img/guide/2.webp" alt="metamask">
    <img src="img/guide/3.webp" alt="metamask">
    <img src="img/guide/4.webp" alt="metamask">
    <img src="img/guide/5.webp" alt="metamask">
    <img src="img/guide/6.webp" alt="metamask">
    <img src="img/guide/7.webp" alt="metamask">
    <img src="img/guide/8.webp" alt="metamask">
    <img src="img/guide/9.webp" alt="metamask">

    <div class="block" v-html="$t('pages.howuse.textTwo')"></div>

  </div>
</template>

<script>
export default {
  name: "HowUse",

}
</script>