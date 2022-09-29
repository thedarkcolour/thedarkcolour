import { sveltekit } from '@sveltejs/kit/vite';
import {} from '';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	base: '/thedarkcolour/',
	server: {
		fs: {
			allow: ['static']
		}
	}
};

export default config;
