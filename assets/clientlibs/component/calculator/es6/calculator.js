import * as libs from '../../../../clientlibs/utilities/utils';

export default class calculator {
  constructor(el) {
    this.props(el);
	  this.events();
	  this.initData();
  }

  props(el) {
	  this.el = $(el);
	  this.options = $.extend({}, this.el.data());
	  this.carsImage = $('[cars-image]', this.el);
	  this.carsSeries = $('[cars-series]', this.el);
	  this.carsType = $('[cars-type]', this.el);
	  this.carsModel = $('[cars-model]', this.el);
	  this.carsPrice = $('[cars-price]', this.el);
  }

  events(){

  }

	initData() {
		const onError = (res) => {
			console.log("error");
		};

		$.ajax({
			url: this.el.data('url'),
			data: {},
			method: 'GET',
			dataType: 'JSON',
			success: (res) => {
				this.successFn(res);
			},
			error: onError,
		});
	}

	successFn(res) {
    const $data = (res && res.data && res.data.series) ? res.data.series : "";
    const $series = $data.length ? $data[0].name : '';
		const $type = $data[0].subseries.length ? $data[0].subseries[0].name : '';
		const $image = $data[0].subseries.length ? $data[0].subseries[0].image : '';
		const $model = $data[0].subseries[0].model[0] ? $data[0].subseries[0].model[0].name : '';
		let $price = $data[0].subseries[0].model[0] ? $data[0].subseries[0].model[0].value : '';
		$price = new Number($price);
		if(this.carsImage.length && $image) {
			this.carsImage.html(`<img src="${$image}"></img>`);
    }
		if(this.carsSeries.length && $series) {
			this.carsSeries.html($series.replace(/<[^>]+>/g, ''));
		}
		if(this.carsType.length && $type) {
			this.carsType.html($type.replace(/<[^>]+>/g, ''));
		}
		if(this.carsModel.length && $model) {
			this.carsModel.html($model.replace(/<[^>]+>/g, ''));
		}
		if(this.carsPrice.length && $price) {
			this.carsPrice.html(libs.formatPriceWithCurrency(this.options.currency, $price.toLocaleString()));
		}

  }

}
