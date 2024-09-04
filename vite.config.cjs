import { defineConfig } from 'vite';

export default defineConfig({
	mode: 'development',

	build: {
		target: 'esnext',

		minify: false,
	},
});
