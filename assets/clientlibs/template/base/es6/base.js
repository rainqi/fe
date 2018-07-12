import Promise from 'promise-polyfill';
import showBreakPoint from '../../../component/showBreakPoint/es6/showBreakPoint';

if (!window.Promise) {
  window.Promise = Promise;
}

const components = {
  'breakPoint': showBreakPoint
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
