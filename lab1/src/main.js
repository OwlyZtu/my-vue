import './assets/tailwind.css'

import {createApp} from 'vue'
import App from "./App.vue"
import {VueReCaptcha} from 'vue-recaptcha-v3'

createApp(App)
    .use(VueReCaptcha, { siteKey: '6LfP5LAqAAAAAG5ks5DjR8nVcU-2ALdrYqeprNSQ' })
    .mount('#app')