<template>
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <Message message="xxsflkdjflaskdjfas" :duration="2" />
  <button @click="handleOpen">message</button>
</template>

<script>
import { getCurrentInstance } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Message from "./components/message";

export default {
  name: "App",
  components: {
    HelloWorld,
    Message,
  },

  setup() {
    const { proxy } = getCurrentInstance();
    const handleOpen = () => {
      const vm = proxy.$message({
        message: "拉客的",
      });
      setTimeout(() => {
        vm.close();
      }, 2000);
    };
    return { handleOpen };
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
