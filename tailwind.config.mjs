/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: theme => ({
				'desktop': "url(/images/pattern-bg-desktop.png)",
				'mobile': "url(/images/pattern-bg-mobile.png)"
			})
		},
	},
	plugins: [],
}
