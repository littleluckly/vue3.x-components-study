<template>
  <input type="text" :value="modelValue" @input="handleChange" />
</template>
<script>
import { inject } from "vue";
export default {
  name: "ti-input",
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const tiFormItem = inject("tiFormItem");

    const handleChange = (e) => {
      emit("update:modelValue", e.target.value);
      console.log("change");
      tiFormItem && tiFormItem.formItemEmitter.emit("validate");
    };

    const handleBlur = () => {
      console.log("blur");
      tiFormItem && tiFormItem.formItemEmitter.emit("validate");
    };
    return { handleChange, handleBlur };
  },
};
</script>
