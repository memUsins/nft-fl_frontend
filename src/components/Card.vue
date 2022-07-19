<template>
  <li
    class="card"
    :class="{
      disabled: (cards.isActive && isLoading) || !cards.isActive,
    }"
  >
    <img
      :src="`img/planets/${cards.lvl}.webp`"
      alt="planet"
      class="card-planet float"
    />
    <div class="content block block_bg">
      <ul class="list">
        <li class="item level-info">
          <span class="level">{{ cards.lvl }} lvl</span>
          <span class="price">{{ cards.price }} BNB</span>
        </li>
        <div class="line">
          <div
            class="progress"
            :style="`right: ${Progress(cards.progress)}%`"
          ></div>
        </div>
        <li class="item info">
          <p>Кругов осталось:</p>
          <span>{{ cards.paymantCount }}</span>
        </li>

        <li class="item info">
          <p>Выплаты с уровня:</p>
          <span>{{ cards.paymant }}</span>
        </li>
      </ul>
      <div class="buttons">
        <button class="buy button" @click="Buy(cards)">Купить</button>
        <button class="outline button" @click="Reinvest(cards)">
          Реинвест
        </button>
      </div>
    </div>
    <div class="loader_spinner" v-if="isLoading && cards.isActive">
      <div class="loader">
        <span class="a"></span>
        <span class="b spin">
          <span class="c"></span>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "card",
  props: ["cards", "isLoading"],
  computed: { ...mapGetters(["getContractInfo"]) },
  methods: {
    Buy(id) {
      return this.$emit("BUY-cardId", id);
    },
    Reinvest(id) {
      return this.$emit("REINVEST-cardId", id);
    },
    Progress(progress) {
      if (progress <= 0) return 100;
      if (progress <= 10) return 90;
      if (progress <= 20) return 80;
      if (progress <= 30) return 70;
      if (progress <= 40) return 60;
      if (progress <= 50) return 50;
      if (progress <= 60) return 40;
      if (progress <= 70) return 30;
      if (progress <= 80) return 20;
      if (progress <= 90) return 10;
      if (progress <= 100) return 0;
    },
  },
};
</script>