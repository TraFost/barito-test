# Technical Test

## Frontend Slicing Test

![Alt text](/public/screenshot-test/application.png?raw=true "Optional Title")

## Logic Test

### Soal Two Sum

-> Diberikan array berisi n integer. Berikan index dari kedua angka yang jika dijumlahkan bisa
menjadi sama dengan target yang diberikan.

```js
const twoSum = function (nums, target) {
	// object untuk menyimpan element dan index
	const storage = {};

	let i = 0;

	// iterasi dari panjangnya array params nums
	for (i; i < nums.length; i++) {
		const element = nums[i]; // dapatkan element
		const targetedNumber = target - element; // hitung target number

		// jika targeted number ada di dalam storage
		if (targetedNumber in storage) {
			return [storage[targetedNumber], i]; // return index dari targeted number dan index dari element
		}
		storage[element] = i; // simpan element dan indexnya
	}

	return false; // jika tidak ada pasangan yang ditemukan return false
};

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
```

### Soal Programmer IT Dictionary

-> Cari semua metode kita dapat memecah masukan string ke dalam string di dalam kamus!

```js
function findAllWords(input, dictionary, result = [], currentResult = "") {
	// iterasi dari panjang input string
	for (let i = 0; i < input.length; i++) {
		const prefix = input.substring(0, i + 1); // dapatkan prefix dari input

		// jika prefix ada di dalam dictionary
		if (dictionary.includes(prefix)) {
			const newResult = currentResult ? `${currentResult}, ${prefix}` : prefix;
			const suffix = input.substring(i + 1);

			// jika suffix kosong push newResult ke dalam result
			if (suffix.length === 0) {
				result.push(newResult);
			} else {
				// rekursif untuk mencari kata selanjutnya
				findAllWords(suffix, dictionary, result, newResult);
			}
		}
	}
}

// Fungsi untuk mencari kata-kata yang mungkin dari input string
function findWordBreaks(input, dictionary) {
	const result = [];
	findAllWords(input, dictionary, result);
	return result;
}

// Contoh penggunaan
const dictionary = ["pro", "gram", "merit", "program", "it", "programmer"];

console.log(findWordBreaks("programit", dictionary));
// Output: [ 'pro, gram, it', 'program, it' ]

console.log(findWordBreaks("programmerit", dictionary));
// Output: [ 'pro, gram, merit', 'program, merit', 'programmer, it' ]
```

### Soal Jual Beli Saham

-> Carilah profit tertinggi yang bisa didapatkan dari memberi dan menjual. Hari beli < Hari Jual.

```js
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
```

### Palindrome Terbesar

-> Carilah palindrom terbesar dari perkalian angka n
tersebut!

```js
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
```
