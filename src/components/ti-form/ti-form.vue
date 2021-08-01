<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
import { provide, reactive, toRefs, getCurrentInstance } from "vue";
export default {
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const fields = reactive([]);

    const validate = (cb) => {
      const tasks = fields.map((item) => item.validate());
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => {
          console.log("catch-false");
          cb(false);
        });
    };
    proxy.$sub("ti.form.addField", (field) => {
      field && fields.push(field[0]);
    });

    const tiForm = reactive({
      ...toRefs(props),
    });
    provide("tiForm", tiForm);

    return { fields, validate };
  },
};
</script>
