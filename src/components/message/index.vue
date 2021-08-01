<template>
  <div class="message" v-if="isShow">
    <p>
      {{ message }}
    </p>
    <button @click="close">关闭弹窗</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3,
    },
  },
  setup(props) {
    let isShow = ref(false);

    const show = () => {
      console.log("duration", props.duration);
      isShow.value = true;
      setTimeout(() => {
        isShow.value = false;
      }, props.duration * 1000 || 10000000);
    };

    const close = () => {
      isShow.value = false;
    };
    return { isShow, show, close };
  },
  created() {
    this.show();
  },
};
</script>
