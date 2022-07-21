import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");

library.add([faPlay, faStepBackward, faStepForward, faPause, faMoon, faSun, faMobileScreen]);
