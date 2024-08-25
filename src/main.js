import { createApp } from 'vue'
import App from './App.vue'
import MainCss from '@/assets/css/main.css'
import router from "@/router";
import { createPinia } from 'pinia';
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const pinia = createPinia();
const app = createApp(App);
    app
    .use(router)
    .use(MainCss)
    .use(pinia)
    .use(BootstrapVue3)
    .mount('#app');