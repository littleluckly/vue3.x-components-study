import mitt from "mitt";

export default {
  install(Vue) {
    const _emitter = mitt();

    // 全局发布（在Vue全局方法中自定义$pub发布方法）
    // 这里做了$pub方法能够携带多个参数的处理，方便我们再业务中触发事件时带多个参数
    Vue.config.globalProperties.$pub = (...args) => {
      _emitter.emit(args[0], args.slice(1));
    };

    // 全局订阅（在Vue全局方法中自定义$sub订阅方法）
    Vue.config.globalProperties.$sub = function(...args) {
      // Reflect.apply(_emitter.on, _emitter, args);
      _emitter.on.apply(_emitter, args);
    };

    // 取消订阅
    Vue.config.globalProperties.$unsub = function(...args) {
      // Reflect.apply(_emitter.off, _emitter, args);
      _emitter.off.apply(_emitter, args);
    };
  },
};
