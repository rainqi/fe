import {
	isIOS,
	isBrowser,
	isTablet,
	isMobile,
	isDesktop,
} from '../../../../clientlibs/utilities/device';
import * as libs from '../../../../clientlibs/utilities/utils';

import renderOptions from './render-options';

export default class seriesSelector {
	constructor(el) {
		this.props(el);
		this.events();
		this.loadData();
	}

	props(el) {
		this.el = $(el);
		this.options = this.el.data();
		this.$modelselectWrap = $('[model-select-wrap]', this.el);
		this.$modelSelectorBtn = $('[model-select-btn]', this.el);
		this.$note = $('[calcultor-note]', this.el);
		this.currency = '¥';
		this.classNames = {
			selected: 'modelselect--selected',
		};
		this.data = null;
		this.$carsType = this.el.closest('.calculator__wrapper').find("[cars-type]");
		this.$carsSereis = this.el.closest('.calculator__wrapper').find("[cars-series]");
		this.$carsPrice = this.el.closest('.calculator__wrapper').find("[cars-price]");
		this.$carsImage = this.el.closest('.calculator__wrapper').find("[cars-image]");
		this.$carsMode = this.el.closest('.calculator__wrapper').find("[cars-model]");
		this.$clearBtn = this.el.closest('.calculator__wrapper').find("[btn-clear]");
	}
	// init isScroll
	init(isInit) {
		if(isInit) {
			const $listCars = $('.list-cars', this.el);
			$listCars.data('iscroll', isMobile()
				? {
					refresh: $.noop,
					scrollTo: function (x = 0, y = 0, time = 200) {
						$listCars.animate({
							scrollTop: y
						}, time);
					}
				}
				: new IScroll($listCars.get(0), {
					mouseWheel: true,
					interactiveScrollbars: isDesktop() || isBrowser('ie'),
					scrollbars: 'custom',
					keyBindings: true,
					HWCompositing: false,
					tap: true
				})
			);

			$('.dropdown-toggle', this.el).dropdown();
		}
	}

	events() {
		const namespace = 'modelselect';
		const clickEvent = `click.${namespace}`;
		const tapEvent = `tap.${namespace}`;
		const clickItemEvent = isIOS() && isTablet() ? tapEvent : clickEvent;

		$('.dropdown-cars', this.el)
			.on('shown.bs.dropdown', () => {
				const $listCars = this.el.find('.list-cars');

				const iScrollInstance = $listCars.data('iscroll');
				if(iScrollInstance) {
					iScrollInstance.refresh();
					iScrollInstance.scrollTo(0, 0, 200);
				}

				$('.dropdown-bikes', this.el).off(clickEvent).on(clickEvent, ev => {
					this.handlerClickDropdown(ev);
				});
				$('li', $listCars).off(clickItemEvent).on(clickItemEvent, ev => {
					this.handlerClickDropdownItem(ev);
				});
			})
			.on('hidden.bs.dropdown', () => {
				if (!isMobile()) {
					return false;
				}
			});

		this.$clearBtn.off("click").on("click", ev => {
			console.log(ev.target);
		});
	}

	loadData() {
		const onError = (res) => {
			console.log("error");
		};

		$.ajax({
			url: this.el.data('url'),
			data: {},
			method: 'GET',
			dataType: 'JSON',
			success: (res) => {
				this.successFn(res, this.options.from);
			},
			error: onError,
		});
	}
	// init data
	populateSelect(item, data, options, isInit = true) {
		item.html(renderOptions(data, options, isInit));
		this.init(isInit);
	}
	// ajax success callback
	successFn(res) {
		this.data = res.data;
		const data = res.data[this.options.type];
		this.populateSelect(this.$modelselectWrap, data, this.options.texts, !this.options.from);
	}

	// handler button click events
	handlerClickDropdown(ev) {
		ev.preventDefault();
		ev.stopPropagation();
		const $target = $(ev.currentTarget);
		this.$modelSelectorBtn = $('[model-select-btn]', this.el);
		this.$modelSelectorBtn.html($target.html());
		this.$modelSelectorBtn.addClass(this.classNames.selected);
		this.$modelSelectorBtn.dropdown('toggle');
		this.$modelSelectorBtn.blur();
	}

	// handler options click events
	handlerClickDropdownItem(ev) {
		const $target = $(ev.currentTarget);
		const $index = $target.data('index');
		const $name = $target.data('name');
		const $value = $target.data('value');
		const $image = $target.data('img');

		this.handlerClickDropdown(ev);
		if (this.options.type === 'series') {
			this.populatesubseries($index, this.options.to);
			this.$carsSereis.html($name);
			this.$carsType.html('');
			this.$carsPrice.html('');
			this.$carsMode.html('');
		}
		if (this.options.type === 'subSeries') {
			const $parentIndex = $(`[data-to='${this.options.from}']`).find('button a').data('index');
			this.populateModel($index, $parentIndex, this.options.to);
			if ($image.length) {
				this.$carsImage.html(`<img src="${$image}"></img>`);
			}
			this.$carsType.html($name);
		}
		if (this.options.type === 'model') {
			this.$carsMode.html($name);
			this.$carsPrice.html(libs.formatPriceWithCurrency(this.currency, $value.toLocaleString()));
		}
		if (this.options.type === 'loans' && this.$note.length) {
			const $note = $target.data('note');
			this.$note.html($note);

		}
	}
	// set the second level data
	populatesubseries(index, dataTo) {
		const $subSeriesData = this.data.series[index].subseries;
		const item = $(`[data-from='${dataTo}']`).find('[model-select-wrap]');
		if (item.length) {
			this.populateSelect(item, $subSeriesData, this.options.texts, true);
		}
	}

	// set the third level data
	populateModel(index, parentIndex, dataTo) {
		const $modelData = this.data.series[parentIndex].subseries[index].model;
		const item = $(`[data-from='${dataTo}']`).find('[model-select-wrap]');
		if (item.length) {
			this.populateSelect(item, $modelData, this.options.texts, true);
		}
	}
}
