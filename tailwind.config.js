/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#4EA8DE",
				secondary: "#5E60CE",
				"dark-primary": "#1E6f9f",
				"custom-gray": "#808080",
			},
		},
	},
	plugins: [],
};
