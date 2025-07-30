/**
 * "kick up my hooves,
 * charge at the monster in the dark
 * with desperate hope,
 * it’s unaware my teeth aren’t sharp
 * let me be hurt
 * let me be terrified and bruised
 * for i just know that you’re too much for me to lose"
 *  -- excerpt from "world of white" by bit depth
 * 
 * ---
 * 
 * this is sonapage, a simple fursona schema viewer.
 */

import '@/assets/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
