import {createI18n} from 'vue-i18n';

import en from "./en";
import ru from "./ru";

export default createI18n({
  locale: localStorage.getItem("last-locale") || "ru",
  fallbackLocale: "ru",
  messages: {en, ru}
});
