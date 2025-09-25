
export default {
  darkMode: ["class"],
  content: [
  './pages/**/*.{js,jsx}',
  './components/**/*.{js,jsx}',
  './app/**/*.{js,jsx}',
  './src/**/*.{js,jsx}'],

  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
      },
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)'
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)'
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)'
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)'
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)'
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)'
        },
        error: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-error-foreground)'
        },

        'brand-primary': 'var(--color-brand-primary)',
        'brand-secondary': 'var(--color-brand-secondary)',
        'conversion-accent': 'var(--color-conversion-accent)',
        'trust-builder': 'var(--color-trust-builder)',
        'background-canvas': 'var(--color-background-canvas)',
        'cta': 'var(--color-cta)',

        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',

        'surface': 'var(--color-surface)'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        brand: "0 8px 0 8px"
      },
      spacing: {
        'brand-xs': 'var(--spacing-xs)',
        'brand-sm': 'var(--spacing-sm)',
        'brand-md': 'var(--spacing-md)',
        'brand-lg': 'var(--spacing-lg)',
        'brand-xl': 'var(--spacing-xl)',
        'brand-2xl': 'var(--spacing-2xl)',
        'brand-3xl': 'var(--spacing-3xl)'
      },
      boxShadow: {
        'brand-sm': 'var(--shadow-sm)',
        'brand-md': 'var(--shadow-md)',
        'brand-lg': 'var(--shadow-lg)',
        'brand-xl': 'var(--shadow-xl)'
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'scale-pulse': 'scale-pulse 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'dash': 'dash 1s linear infinite'
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' }
        },
        'scale-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'dash': {
          'to': {
            'stroke-dashoffset': '-10'
          }
        }
      },
      transitionDuration: {
        'brand': 'var(--animation-duration)'
      },
      transitionTimingFunction: {
        'brand': 'var(--animation-timing)'
      },
      gridTemplateAreas: {
        'hero-desktop': '"demo content"',
        'hero-mobile': '"content" "demo"',
        'dashboard': '"sidebar main" "sidebar main"',
        'dashboard-mobile': '"main" "main"'
      },
      gridTemplateColumns: {
        'hero-desktop': '60% 40%',
        'dashboard': '280px 1fr'
      },
      backdropBlur: {
        'brand': '8px'
      },
      zIndex: {
        'header': '50',
        'sidebar': '40',
        'modal': '100',
        'tooltip': '110'
      }
    }
  },
  plugins: [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography"),
  require("@tailwindcss/forms")]

};