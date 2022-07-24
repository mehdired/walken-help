import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSvgPlugin from 'vite-plugin-react-svg'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), reactSvgPlugin()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@features': path.resolve(__dirname, './src/features'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@': path.resolve(__dirname, './src'),
		},
	},
})
