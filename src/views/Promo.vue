<template>
  <div class="game-layout-content block">
    <div class="screen__title">
      <h1 class="title">Unique</h1>
      <p class="description">{{ $t("pages.home.slogan") }}</p>
    </div>

    <h3 class="title">{{ $t("pages.home.about.title") }}</h3>
    <div class="block" v-html="$t('pages.home.about.text')"></div>

    <h3 class="title">{{ $t("pages.home.howWork.title") }}</h3>
    <p v-html="$t('pages.home.howWork.text')" class="block"></p>

    <ul class="list">
      <li class="item">
        <span>UNIQUE Matrix </span>
        <small>
          {{ $t("pages.home.howWork.uniqueMatrix") }}
        </small>
      </li>
      <li class="item">
        <span>UNIQUE Farming </span>
        <small>
          {{ $t("pages.home.howWork.uniqueFarming") }}
        </small>
      </li>
    </ul>

    <h3 class="title">{{ $t("pages.home.howWorkMatrix.title") }}</h3>

    <div class="block">
      <p class="first">
        {{ $t("pages.home.howWorkMatrix.allSum") }}:
      </p>
      <ul class="price-list">
        <li class="item">
          <span>60%</span>
        </li>
        <li class="item">
          <span>20%</span>
        </li>
        <li class="item">
          <span>20%</span>
        </li>
      </ul>
      <p class="last">
        <b>
          {{ $t("pages.home.howWorkMatrix.smartSum") }}
        </b>
      </p>
    </div>

    <div class="block">
      <p>{{ $t("pages.home.howWorkMatrix.basePaymant") }}:</p>
      <ul class="price-list">
        <li class="item">
          <span>60% </span> — <small class="smallest">{{ $t("pages.home.howWorkMatrix.goAtNew") }}</small>
        </li>
        <li class="item">
          <span>20% </span> — <small class="smallest">{{ $t("pages.home.howWorkMatrix.referalProgramm") }}</small>
        </li>
        <li class="item">
          <span>20% </span> — <small class="smallest">{{ $t("pages.home.howWorkMatrix.toSmart") }}</small>
        </li>
      </ul>
    </div>

    <h3 class="title">{{ $t("pages.home.howWorkFarming.title") }}</h3>
    <ul class="list list_colum" v-html="$t('pages.home.howWorkFarming.text')"></ul>

    <h3 class="title">{{ $t("pages.home.aboutNumbers.title") }}:</h3>
    <p class="description">{{ $t("pages.home.aboutNumbers.description") }}</p>

    <div class="block" v-html="$t('pages.home.aboutNumbers.text.one')"></div>
    <div class="block" v-html="$t('pages.home.aboutNumbers.text.two')"></div>
    <div class="block" v-html="$t('pages.home.aboutNumbers.text.thee')"></div>
    <div class="block" v-html="$t('pages.home.aboutNumbers.text.four')"></div>
  </div>
</template>

<script>
export default {
  name: "Promo",
}
</script>