<template>
  <div>
    <h2>表单form组件</h2>
    <ti-form ref="form" :model="formData" :rules="rules">
      <ti-form-item label="名称" prop="name">
        <ti-input v-model="formData.name"></ti-input>
      </ti-form-item>
      <ti-form-item>
        <button @click="onSubmit">提交</button>
      </ti-form-item>
    </ti-form>
    <hr />
  </div>
</template>
<script>
import { reactive, getCurrentInstance } from "vue";

import TiInput from "../../components/ti-input";
import TiForm from "../../components/ti-form/ti-form.vue";
import TiFormItem from "../../components/ti-form/ti-form-item.vue";
export default {
  components: {
    TiForm,
    TiFormItem,
    TiInput,
  },
  setup() {
    const formData = reactive({ name: "" });
    const rules = {
      name: [{ required: "true", message: "请输入名称" }],
    };
    const { proxy } = getCurrentInstance();
    const onSubmit = (e) => {
      e.preventDefault();
      proxy.$refs.form.validate((valid) => {
        console.log("valid", valid);
      });
    };
    return { formData, rules, onSubmit };
  },
};
</script>
