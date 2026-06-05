import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        surface: "#1A1F26",
        "surface-high": "#2A3038",
        "surface-border": "#31353c",
        primary: "#0077FF",
        "primary-light": "#aec6ff",
        "on-surface": "#dfe2eb",
        "on-surface-muted": "#8b90a1",
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "glow-blue": "radial-gradient(ellipse at center, rgba(0,119,255,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
