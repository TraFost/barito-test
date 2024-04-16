function isPalindrome(num) {
	const strNum = num.toString();
	const reversedStrNum = strNum.split("").reverse().join("");
	return strNum === reversedStrNum;
}

// Fungsi untuk mencari palindrom terbesar dari hasil perkalian dua bilangan dengan n digit
function largestPalindrome(n) {
	let maxNum = Math.pow(10, n) - 1; // Maksimum bilangan dengan n digit
	let minNum = Math.pow(10, n - 1); // Minimum bilangan dengan n digit

	let maxPalindrome = 0;

	// Iterasi dari bilangan terbesar hingga bilangan terkecil
	for (let i = maxNum; i >= minNum; i--) {
		for (let j = i; j >= minNum; j--) {
			let product = i * j;
			if (product <= maxPalindrome) break; // Hentikan iterasi jika produk lebih kecil dari palindrom terbesar yang telah ditemukan

			// Periksa apakah produk adalah palindrom
			if (isPalindrome(product) && product > maxPalindrome) {
				maxPalindrome = product;
			}
		}
	}

	return maxPalindrome;
}

// Contoh penggunaan
console.log(largestPalindrome(2)); // Output: 9009
console.log(largestPalindrome(3)); // Output: 906609
