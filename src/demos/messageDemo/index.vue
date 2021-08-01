<template>
  <div>
    <h2>Message组件</h2>
    <Message message="xxsflkdjflaskdjfas" :duration="2" />

    <button @click="handleOpen">显示消息提示message</button>
    <hr />
  </div>
</template>
<script>
import { getCurrentInstance } from "vue";
import Message from "../../components/message";
export default {
  components: { Message },
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

    const handleChange = (v) => {
      console.log(v);
    };
    return { handleOpen, handleChange };
  },
};
</script>
