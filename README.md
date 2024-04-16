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
