/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          900: "#1e3a8a",
        },
        accent: {
          500: "#ea580c",
          600: "#dc2626",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          600: "#4b5563",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Roboto Slab", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 17s linear infinite reverse",
        "fade-in-down": "fadeInDown 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
