import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from 'rollup-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components'),
			'@features': path.resolve(__dirname, './src/features'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@': path.resolve(__dirname, './src'),
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
			events: 'rollup-plugin-node-polyfills/polyfills/events',
			assert: 'assert',
			crypto: 'crypto-browserify',
			util: 'util',
		},
	},
	build: {
		target: 'es2020',
		rollupOptions: {
			plugins: [nodePolyfills({ crypto: true })],
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2020',
			plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
		},
	},
})
