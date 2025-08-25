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
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Roboto Slab", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}

