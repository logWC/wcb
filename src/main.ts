import { createApp } from "vue";
import { createPinia } from "pinia";

import api from "./api/index";
import ElementPlus from 'element-plus'
import App from "./App.vue";
import router from "./router";
import '@/assets/fonts/iconfont.js'

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus)

app.config.globalProperties.$api = api

app.mount("#app");
