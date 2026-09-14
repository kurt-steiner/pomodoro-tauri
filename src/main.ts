import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from './router'

import { align_self } from "./directive/index.ts";

const pinia = createPinia()
createApp(App)
    .use(pinia)
    .use(router)
    .directive("align-self", align_self)
    .mount("#app");
