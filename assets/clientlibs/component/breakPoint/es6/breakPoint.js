import {
	isIOS,
	isBrowser,
	isTablet,
	isMobile,
	isDesktop,
} from '../../../../clientlibs/utilities/device';

export default class breakPoint {
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
		console.log('init');
	}

	events() {
		this.setBreakpointsState();
	}

	setBreakpointsState(){
		const root = document.querySelector('html');

		// Set initial state
		if(localStorage.getItem("breakpoints") !== "shown")
		{
			root.classList.remove('sg-is-show-breakpoints');
		}

		// Breakpoint toggle
		const bpToggle = document.querySelectorAll('.js-toggle-breakpoints');

		for(var i = 0; i < bpToggle.length; i++)
			{
				bpToggle[i].addEventListener('click', (e)=>
				{
					e.preventDefault();

					if(root.classList.contains("sg-is-show-breakpoints"))
					{
						localStorage.removeItem("breakpoints");
						root.classList.remove('sg-is-show-breakpoints');
					}
					else
					{
						localStorage.setItem("breakpoints", "shown");
						root.classList.add('sg-is-show-breakpoints');
					}
				});
			}
		return this;
	};

}
