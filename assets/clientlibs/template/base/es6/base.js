import Promise from 'promise-polyfill';
import calculator from '../../../component/calculator/es6/calculator';
import seriesSelector from '../../../component/series-selector/es6/series-selector';

if (!window.Promise) {
  window.Promise = Promise;
}

const components = {
	'calculator': calculator,
  'series-selector': seriesSelector
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
