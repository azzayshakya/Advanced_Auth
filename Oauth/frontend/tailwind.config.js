// @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate";

// @type {import('tailwindcss').Config} /
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{html,js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{html,js,jsx,ts,tsx,md,mdx}",
    "./app/**/*.{html,js,jsx,ts,tsx,md,mdx}",
    "./src/**/*.{html,js,jsx,ts,tsx,md,mdx}",
    "./ui-kit/**/*.{html,js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    fontSize: {
      sm: ["0.96rem", "1.35rem"],
      base: ["1rem", "1.5rem"],
      lg: ["1.1rem", "1.6rem"],
      xl: ["1.2rem", "1.75rem"],
      "2xl": ["1.45rem", "2rem"],
      "3xl": ["1.825rem", "2.25rem"],
      "4xl": ["2.2rem", "2.5rem"],
      "5xl": ["2.95rem", "1"],
    },
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
      screens: {
        mxs: "280px",
        msm: "320px",
        mmd: "375px",
        mlg: "425px",
        xs: "500px",
        "2md": "868px",
        "3md": "968px",
        "2lg": "1124px",
        "3lg": "1224px",
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        navyblue: "var(--navy-blue)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        // light-green:"var(--light-green)",
        "light-green":"var(--light-green)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        success: "var(--success)",
        "success-foreground": "var(--success-foreground)",
        warning: "var(--warning)",
        "warning-foreground": "var(--warning-foreground)",
        info: "var(--info)",
        "info-foreground": "var(--info-foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "bounce-light": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-delayed": "fade-in 0.5s ease-out 0.3s forwards",
        "fade-in-up-1": "fade-in-up 0.5s ease-out",
        "fade-in-up-2": "fade-in-up 0.5s ease-out 0.1s both",
        "fade-in-up-3": "fade-in-up 0.5s ease-out 0.2s both",
        "fade-in-up-4": "fade-in-up 0.5s ease-out 0.3s both",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "bounce-light": "bounce-light 2s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
