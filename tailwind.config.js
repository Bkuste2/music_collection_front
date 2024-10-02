/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'project-green': {
					100: '#35C11F',
					200: '#60B653',
					300: '#4D9242',
					400: '#437F3A',
				},
				'project-gray': {
					700: '#313131',
				},
				'project-red': {
					100: '#FF0E0E74',
				},
			},
		},

	},
	plugins: [],
}
