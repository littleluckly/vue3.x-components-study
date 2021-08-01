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

    // 接受父组件传递的`formItemEmitter`、`prop`、`model`、`rules`属性和方法
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

    // 定义响应式的表单项对象，将props、校验方法、事件总线通过`provide`传递给子孙后代组件，如`ti-input`、`ti-select`等具体的UI控件
    const tiFormItem = reactive({
      ...toRefs(props),
      formItemEmitter: emitter,
      validate,
    });
    provide("tiFormItem", tiFormItem);

    onMounted(() => {
      // 注册validate事件， 用于UI控件触发校验, 如ti-input控件
      emitter.on("validate", validate);

      // 通过父组件的事件总线，将表单项校验方法传递给父组件
      if (props.prop) {
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
