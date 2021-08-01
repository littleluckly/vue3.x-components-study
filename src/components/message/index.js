import { createApp, h } from "vue";
import Message from "./index.vue";

export const message = (props) => {
  const container = document.createElement("div");
  // 获取组件的DOM，将其挂载到body上
  const vm = createApp({
    render() {
      return h(Message, props);
    },
  });
  document.body.appendChild(vm.mount(container).$el);
  return {
    close: () => vm.component.proxy && (vm.component.proxy.isShow = false),
  };
};
