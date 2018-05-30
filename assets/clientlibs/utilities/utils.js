
// Format Price with Currency

export function formatPriceWithCurrency(currency, price) {
	const finalPrice = price || 0;
	const finalCurrency = currency || '$';
	return finalCurrency + finalPrice;
}
