<template>
  <input type="text" :value="modelValue" @input="handleChange" />
</template>
<script>
import { getCurrentInstance } from "vue";
export default {
  name: "ti-input",
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const handleChange = (e) => {
      emit("update:modelValue", e.target.value);
      proxy.$pub("ti.form.item.validate");
    };

    const handleBlur = () => {
      console.log("blur");
    };
    return { handleChange, handleBlur };
  },
};
</script>
