/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				ink: '#101317',
				paper: '#ffffff',
				accent: '#3A78FF',
				slate: {
					100: '#E6EAF0',
					900: '#0F1720',
				},
			},
			borderRadius: {
				xl: '14px',
			},
			boxShadow: {
				brand: '0 6px 30px rgba(16,19,23,0.08)',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['"Source Serif 4"', 'serif'],
			},
			fontSize: {
				h1: ['2.5rem', { lineHeight: '1.1' }],
				h2: ['2rem', { lineHeight: '1.15' }],
				h3: ['1.5rem', { lineHeight: '1.2' }],
			},
			spacing: {
				gap: '1.25rem',
			},
		},
	},
	plugins: [],
};

