import { createI18n } from "vue-i18n";
import zh from "./zh";
import en from "./en";

export type Locale = "zh" | "en";

export const defaultLocale: Locale = "zh";
export const availableLocales: Locale[] = ["zh", "en"];

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "zh",
  messages: {
    zh,
    en,
  },
});

const $t = i18n.global.t;
export { i18n, $t };
