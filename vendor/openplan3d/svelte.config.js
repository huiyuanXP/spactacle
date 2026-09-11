import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: { base: '/engine' },
		adapter: adapter()
	}
};

export default config;
