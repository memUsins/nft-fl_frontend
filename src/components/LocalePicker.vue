<template>
  <form class="locale-changer">
    <ul class="locale-list">
      <li class="locale-item" v-for="locale in $i18n.availableLocales" :key="`${locale}`" :value="locale">
        <input type="radio" :id="locale" :value="locale" v-model="$i18n.locale"/>
        <label :for="locale">
          <img :src="`img/flags/${locale}.webp`" :alt="locale"/>
        </label>
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  name: "locale-picker",
};
</script>
