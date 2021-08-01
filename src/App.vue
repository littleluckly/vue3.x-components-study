<template>
  <message-demo />
  <input-demo />
  <form-demo></form-demo>
  <button @click="onClick">$emit</button>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
import FormDemo from "./demos/formDemo";
import MessageDemo from "./demos/messageDemo";
import InputDemo from "./demos/inputDemo";

export default {
  name: "App",
  components: {
    MessageDemo,
    FormDemo,
    InputDemo,
  },

  setup() {
    const { proxy } = getCurrentInstance();
    proxy.$sub("my-event", () => {
      console.log("$on: my-event");
    });

    onMounted(() => {});

    const onClick = () => {
      proxy.$pub("my-event");
    };
    return { onClick };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
