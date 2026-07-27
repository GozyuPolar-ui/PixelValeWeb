import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#fbf9f5",
        "surface-container-low": "#f5f3ef",
        "surface-container": "#efeeea",
        "surface-container-high": "#eae8e4",
        "surface-variant": "#e4e2de",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#55423f",
        "ink-rich": "#2D2926",
        "ink-muted": "#6B655E",
        primary: "#994032",
        "primary-fixed": "#ffdad4",
        secondary: "#466556",
        "secondary-fixed": "#c8ead8",
        outline: "#89726e",
        "outline-variant": "#dcc0bc",
        "paper-dark": "#F2EBE1",
      },
      fontFamily: {
        display: ["var(--font-space-mono)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        pixel: "2px 2px 0px 0px #89726e",
        "pixel-hover": "4px 4px 0px 0px #994032",
      },
      maxWidth: { "container-max": "1280px" },
    },
  },
  plugins: [],
};
export default config;