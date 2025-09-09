/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // para Next.js /app
    "./pages/**/*.{js,ts,jsx,tsx}",  // se ainda usar /pages
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-light": "var(--color-primary-light)",
        secondary: "var(--color-secondary)",
        "secondary-light": "var(--color-secondary-light)",
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-dark": "var(--color-surface-dark)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        success: "var(--color-success)",
        "success-light": "var(--color-success-light)",
        warning: "var(--color-warning)",
        "warning-light": "var(--color-warning-light)",
        error: "var(--color-error)",
        "error-light": "var(--color-error-light)",
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
        "border-focus": "var(--color-border-focus)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};
