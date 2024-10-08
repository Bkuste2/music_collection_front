import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@pages': resolve(__dirname, './src/pages'),
			'@components': resolve(__dirname, './src/components'),
			'@services': resolve(__dirname, './src/services'),
			'@contexts': resolve(__dirname, './src/contexts'),
			'@helpers': resolve(__dirname, './src/helpers'),
		},
	},
	plugins: [react()],
})
