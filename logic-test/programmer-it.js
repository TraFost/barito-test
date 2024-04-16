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
