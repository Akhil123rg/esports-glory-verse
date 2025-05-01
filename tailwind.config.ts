
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// eSports theme colors
				esports: {
					background: '#0F1123', 
					accent1: '#7E22CE', // Purple
					accent2: '#06B6D4', // Cyan
					accent3: '#EF4444', // Red
					text: '#F9FAFB',
					card: '#1A1E35',
					muted: '#64748B'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow': {
					'0%, 100%': { 
						textShadow: '0 0 10px rgba(126, 34, 206, 0.7), 0 0 20px rgba(126, 34, 206, 0.5)' 
					},
					'50%': { 
						textShadow: '0 0 15px rgba(126, 34, 206, 0.9), 0 0 25px rgba(126, 34, 206, 0.7)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-neon': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(126, 34, 206, 0.7), 0 0 10px rgba(126, 34, 206, 0.5)' },
					'50%': { boxShadow: '0 0 10px rgba(126, 34, 206, 0.9), 0 0 15px rgba(126, 34, 206, 0.7)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'pulse-neon': 'pulse-neon 2s infinite'
			},
			fontFamily: {
				display: ['Rajdhani', 'sans-serif'],
				body: ['Inter', 'sans-serif']
			},
			backgroundImage: {
				'esports-gradient': 'linear-gradient(to right, #7E22CE, #06B6D4)',
				'hero-pattern': "url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1920&auto=format')"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
