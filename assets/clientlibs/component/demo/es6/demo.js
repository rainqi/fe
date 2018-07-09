import {
	isIOS,
	isBrowser,
	isTablet,
	isMobile,
	isDesktop,
} from '../../../../clientlibs/utilities/device';
import * as libs from '../../../../clientlibs/utilities/utils';

import renderOptions from './render';

export default class demo {
	constructor(el) {
		this.props(el);
		this.init();
		this.events();
	}

	props(el) {
		this.el = $(el);
		this.options = this.el.data();
		this.classNames = {
			demoClass: 'sg__header--large',
		};
	}

	init() {
		console.log('this is a initial function,', ' init()');
	}

	events() {
		console.log('this is a event function,', ' events()');
	}

}
