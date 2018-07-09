import Promise from 'promise-polyfill';
import demoComponent from '../../../component/demo/es6/demo';
import breakpoints from '../../../component/breakPoint/es6/breakPoint';

if (!window.Promise) {
  window.Promise = Promise;
}

const components = {
  'demo-component': demoComponent,
  'breakPoint': breakpoints
};

$(() => {
  $('[data-component]').each((index, el) => {
    const $el = $(el);
    const name = $el.data('component');

    if (components[name]) {
      new components[name]($el);
    }
  });
});
