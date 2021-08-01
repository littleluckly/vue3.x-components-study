import { createApp } from "vue";
import App from "./App.vue";
// import TiInput from "./components/ti-input";
import emitter from "./plugins/emitter";

import { message } from "./components/message";

const app = createApp(App);
app.config.globalProperties.$message = message;

// app.use(TiInput);
app.use(emitter);
app.mount("#app");
