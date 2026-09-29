/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors
        secondary: "var(--secondary-color)",
        "secondary-transparent-50": "var(--secondary-color-transparent-50)",
        primary: "var(--primary-color)",
        tertiary: "var(--tertiary-color)",
        "tertiary-light": "var(--tertiary-color-light)",
        quaternary: "var(--quaternary-color)",
        "quaternary-transparent-50": "var(--quaternary-color-transparent-50)",
        quinary: "var(--quinary-color)",
        "quinary-transparent-50": "var(--quinary-color-transparent-50)",

        // Basic colors
        cream: "var(--cream-color)",
        "gray-1": "var(--gray-1-color)",
        "gray-2": "var(--gray-2-color)",
        "gray-3": "var(--gray-3-color)",
        "gray-4": "var(--gray-4-color)",
        "gray-5": "var(--gray-5-color)",
        "gray-6": "var(--gray-6-color)",
        white: "var(--white-color)",
        black: "var(--black-color)",
        sandy: "var(--sandy-color)",
        'red': 'var(--red-color)',
        'orange': 'var(--orange-color)',
        'yellow': 'var(--yellow-color)',
        'green': 'var(--green-color)',
        'blue': 'var(--blue-color)',
        'purple': 'var(--purple-color)',

        // Reds and greens
        "green-toast": "var(--green-toast-color)",
        "red-toast": "var(--red-toast-color)",
        "neutral-toast": "var(--neutral-toast-color)",

        // Traffic lights
        "traffic-danger-1": "var(--traffic-light-danger1-light-color)",
        "traffic-danger-2": "var(--traffic-light-danger2-light-color)",
        "traffic-danger-3": "var(--traffic-light-danger3-light-color)",
        "traffic-danger-4": "var(--traffic-light-danger4-light-color)",
        "traffic-neutral": "var(--traffic-light-neutral-light-color)",
        "traffic-safe-1": "var(--traffic-light-safe1-light-color)",
        "traffic-safe-2": "var(--traffic-light-safe2-light-color)",
        "traffic-safe-3": "var(--traffic-light-safe3-light-color)",
        "traffic-safe-4": "var(--traffic-light-safe4-light-color)",

        // Charts
        "chart-red": "var(--chart-red)",
        "chart-orange": "var(--chart-orange)",
        "chart-yellow": "var(--chart-yellow)",
        "chart-green": "var(--chart-green)",
        "chart-blue": "var(--chart-blue)",
        "chart-purple": "var(--chart-purple)",
      },
      boxShadow: {
        // Pridali sme aj tvoje vlastné tiene do Tailwindu!
        "golden-glow": "var(--golden-glow-shadow)",
        "gray-1-glow": "var(--gray-1-glow-shadow)",
        "gray-2-glow": "var(--gray-2-glow-shadow)",
        "dark-basic": "var(--dark-basic-shadow)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}

