/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        board: {
          bg: "#F4F5F7",
          panel: "#FFFFFF",
          ink: "#1B2333",
          muted: "#6B7280",
          line: "#E4E7EC",
          accent: "#3454D1",
          accentDark: "#28409F",
        },
        urgent: {
          DEFAULT: "#D64545",
          soft: "#FBEAEA",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(27, 35, 51, 0.06), 0 1px 1px rgba(27, 35, 51, 0.04)",
        pin: "0 2px 6px rgba(214, 69, 69, 0.35)",
      },
    },
  },
  plugins: [],
};
