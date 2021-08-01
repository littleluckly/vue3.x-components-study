<template>
  <div>
    <h2>ti-input组件</h2>
    <ti-input v-model="name"></ti-input>
    <hr />
  </div>
</template>
<script>
import { ref } from "vue";
import TiInput from "../../components/ti-input";
export default {
  components: { TiInput },
  setup() {
    const name = ref("");
    return { name };
  },
};
</script>
