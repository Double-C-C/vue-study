import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import ElementPlus, { dayjs } from "element-plus";
import pinia from "./stores";
import { i18n } from "./i18n";
/**
 * 除非你知道你在做什么,否则不要随意增删此文件
 */
const app = createApp(App);
// element-plus
app.use(ElementPlus);
// router
app.use(router);
// pinia
app.use(pinia);
// i18n
app.use(i18n);

dayjs.locale(i18n.global.locale.value === "zh" ? "zh-cn" : "en");
app.mount("#app");
