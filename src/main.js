import { createApp } from "vue";
import App from "./App.vue";
// import TiInput from "./components/ti-input";

import { message } from "./components/message";

const app = createApp(App);
app.config.globalProperties.$message = message;

// app.use(TiInput);
app.mount("#app");
