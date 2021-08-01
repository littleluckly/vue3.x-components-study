<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
import { provide, reactive, toRefs } from "vue";
import mitt from "mitt";
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
    const fields = reactive([]);
    const emitter = mitt();

    const validate = (cb) => {
      const tasks = fields.map((item) => item.validate());
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => {
          console.log("catch-false");
          cb(false);
        });
    };

    emitter.on("ti.form.addField", (field) => {
      field && fields.push(field);
    });

    const tiForm = reactive({
      formEmitter: emitter,
      ...toRefs(props),
    });
    provide("tiForm", tiForm);

    return { fields, emitter, validate };
  },
};
</script>
