function findMaxProfit(prices) {
	// Jika hanya ada satu harga atau tidak ada harga
	if (prices.length <= 1) {
		return "Harga selalu turun";
	}

	let minPrice = prices[0]; // Harga terendah yang dilihat
	let maxProfit = 0; // Keuntungan tertinggi yang bisa didapatkan

	for (let i = 1; i < prices.length; i++) {
		const currentPrice = prices[i];

		// Hitung selisih antara harga saat ini dengan harga terendah
		const currentProfit = currentPrice - minPrice;

		// Perbarui keuntungan tertinggi jika keuntungan saat ini lebih besar
		if (currentProfit > maxProfit) {
			maxProfit = currentProfit;
		}

		// Perbarui harga terendah jika harga saat ini lebih rendah
		if (currentPrice < minPrice) {
			minPrice = currentPrice;
		}
	}

	return maxProfit === 0 ? "Harga selalu turun" : maxProfit;
}

// Contoh penggunaan
const prices1 = [10, 15, 8, 7, 14];
console.log(findMaxProfit(prices1)); // Output: 7

const prices2 = [100, 90, 80, 75, 65];
console.log(findMaxProfit(prices2)); // Output: Harga selalu turun
