import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0c0b0a",
        "ink-2": "#1a1815",
        "ink-3": "#252220",
        off: "#f5f2eb",   // <-- this is your main text color
        fog: "#b0a898",
        "fog-2": "#7a7268",
        gold: "#c8a96e",
        "gold-light": "#e8d5a8",
        "gold-dim": "#8a6e3e",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;