<template>
  <!-- Main container -->
  <div class="container container_main homepage">
    <div class="locale-header">
      <LocalePicker/>
    </div>

    <!-- First screen -->
    <div class="screen screen_first">
      <!-- Screen title -->
      <div class="screen__title">
        <h1 class="title">Unique</h1>
        <p class="subtitle">Multi Game</p>
        <p class="description">{{ $t("pages.home.slogan") }}</p>
      </div>
      <!-- Form -->
      <AuthForm></AuthForm>
      <!-- Background -->
      <img src="img/screens/1.webp" alt="bg" class="background background_first"/>
    </div>
    <!-- Second screen -->
    <div class="screen screen_second">
      <!-- Screen title -->
      <div class="screen__title">
        <h1 class="title">{{ $t("pages.home.about.title") }}</h1>
      </div>
      <!-- Content -->
      <div class="block block_bg screen_second-block" v-html="$t('pages.home.about.text')"></div>
      <!-- Float picture -->
      <div class="float ufo">
        <img src="img/screens/ufo.webp" alt="ufo" class="img"/>
        <div class="bg"></div>
      </div>
      <!-- Background -->
      <img src="img/screens/2.webp" alt="bg" class="background background_second"/>
    </div>
    <!-- Third screen -->
    <div class="screen screen_third">
      <!-- Screen title -->
      <div class="screen__title">
        <h1 class="title">{{ $t("pages.home.howWork.title") }}</h1>
      </div>
      <!-- Content -->
      <div class="block block_bg">
        <p v-html="$t('pages.home.howWork.text')" class="block"></p>

        <div class="line"></div>
        <ul class="list">
          <li class="item">
            <span>UNIQUE Matrix</span>
            <small>
              {{ $t("pages.home.howWork.uniqueMatrix") }}
            </small>
          </li>
          <li class="item">
            <span>UNIQUE Farming</span>
            <small>
              {{ $t("pages.home.howWork.uniqueFarming") }}
            </small>
          </li>
        </ul>
      </div>
      <!-- Float picture -->
      <div class="float rocket">
        <img src="img/screens/rocket.webp" alt="rocket" class="img"/>
        <div class="bg"></div>
      </div>
      <!-- Background -->
      <img src="img/screens/3.webp" alt="bg" class="background background_third"/>
    </div>
    <!-- Fourth screen -->
    <div class="screen screen_fourth">
      <!-- Screen title -->
      <div class="screen__title">
        <h1 class="title">
          {{ $t("pages.home.howWorkMatrix.title") }}
        </h1>
      </div>
      <!-- Content -->
      <div class="block-list">
        <div class="block block_bg">
          <p class="first">
            {{ $t("pages.home.howWorkMatrix.allSum") }}:
          </p>
          <div class="line"></div>
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
        <div class="block block_bg block_second">
          <p>{{ $t("pages.home.howWorkMatrix.basePaymant") }}:</p>
          <div class="line line_second"></div>
          <ul class="price-list">
            <li class="item">
              <span>60%</span>
              <p class="smallest">{{ $t("pages.home.howWorkMatrix.goAtNew") }}</p>
            </li>
            <li class="item">
              <span>20%</span>
              <p class="smallest">{{ $t("pages.home.howWorkMatrix.referalProgramm") }}</p>
            </li>
            <li class="item">
              <span>20%</span>
              <p class="smallest">{{ $t("pages.home.howWorkMatrix.toSmart") }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- Background -->
      <img src="/img/screens/4.webp" alt="bg" class="background background_fourth"/>
    </div>
    <!-- Fifth screen -->
    <div class="screen screen_fifth">
      <div class="block-list">
        <!-- Screen title -->
        <div class="screen__title screen__title_left">
          <h1 class="title">{{ $t("pages.home.howWorkFarming.title") }}</h1>
        </div>
        <!-- List -->
        <ul class="list list_colum screen_fourth__list" v-html="$t('pages.home.howWorkFarming.text')"></ul>
      </div>
      <!-- Background -->
      <img src="img/screens/5.webp" alt="bg" class="background background_fifth"/>
    </div>
    <!-- Sixth screen -->
    <div class="screen screen_sixth">
      <!-- Screen title -->
      <div class="screen__title">
        <h1 class="title">{{ $t("pages.home.aboutNumbers.title") }}:</h1>
        <p class="description">{{ $t("pages.home.aboutNumbers.description") }}</p>
      </div>
      <div class="block-list">
        <div class="block block_bg" v-html="$t('pages.home.aboutNumbers.text.one')"></div>
        <div class="block block_bg" v-html="$t('pages.home.aboutNumbers.text.two')"></div>
        <div class="block block_bg" v-html="$t('pages.home.aboutNumbers.text.three')"></div>
        <div class="block block_bg" v-html="$t('pages.home.aboutNumbers.text.four')"></div>
      </div>
      <!-- Float picture -->
      <div class="float planet">
        <img src="img/screens/planet.webp" alt="planet" class="img"/>
        <div class="bg"></div>
      </div>
      <!-- Background -->
      <img src="img/screens/6.webp" alt="bg" class="background background_sixth"/>
    </div>
    <!-- Seventh screen -->
    <div class="screen screen_seventh">
      <!-- Screen title -->
      <div class="screen__title">
        <h1 class="title">Multi Game Unique</h1>
      </div>
      <!-- Form -->
      <AuthForm></AuthForm>
    </div>
  </div>
</template>

<script>
import AuthForm from "./../components/AuthForm.vue";
import LocalePicker from "@/components/LocalePicker";

export default {
  name: "home",
  components: {AuthForm, LocalePicker},
};
</script>
