import BsModal from './BsModal.vue';
import directives from './directives.js';

export default function install(Vue) {

  Vue.component('bs-modal', BsModal);

  for(var name in directives) {
    Vue.directive(name, directives[name]);
  }
}
