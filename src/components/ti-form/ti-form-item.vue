<template>
  <div class="ti-form-item">
    <label for="">
      {{ label }}
    </label>
    <slot></slot>
    <p class="errors">
      {{ error }}
    </p>
  </div>
</template>
<script>
import Schema from "async-validator";
import mitt from "mitt";
import { reactive, onMounted, ref, toRefs, provide, inject } from "vue";
export default {
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
  },
  setup(props) {
    const emitter = mitt();
    let error = ref();
    // const { prop } = toRefs(reactive(props));
    const tiForm = inject("tiForm");

    const validate = () => {
      // 当前表单项校验
      // 获取校验规则和当前数据
      if (!props.prop) return;
      const rules = tiForm.rules[props.prop];
      const value = tiForm.model[props.prop];
      const validator = new Schema({ [props.prop]: rules });
      // 返回promise，全局可以统一处理
      return validator.validate({ [props.prop]: value }, (errors) => {
        // errors存在则校验失败
        console.log("err", errors);
        if (errors) {
          error.value = errors[0].message;
        } else {
          // 校验通过
          error.value = "";
        }
      });
    };

    const tiFormItem = reactive({
      ...toRefs(props),
      formItemEmitter: emitter,
      validate,
    });
    provide("tiFormItem", tiFormItem);

    onMounted(() => {
      emitter.on("validate", validate);
      if (props.prop) {
        console.log(1, tiForm.formEmitter.emit, tiFormItem);
        tiForm.formEmitter.emit("ti.form.addField", tiFormItem);
      }
    });

    return { error, validate };
  },
};
</script>
<style scoped>
.errors {
  color: red;
  font-size: 12px;
}
</style>
