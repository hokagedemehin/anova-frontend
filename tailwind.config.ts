import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        iconBg: "#EEF4FF",
        buttonBg: "#001D49",
        buttonBgHover: "#002366",
        footerBg: "#001D49",
        signInBg: "#002D72",
        signInBgHover: "#002366",
        signInAlt: "#2B67C4",
        main: "#002D72",
        mainHover: "#002366",
        otherMain: "#001D49",
        dublicateContrib: "#7B7112",
        unverifiedContrib: "#6E101B",
        noUniBg: "#EEF4FF",
        noStateBg: "#FFF3D2",
        noPolyBg: "#FFE2E2",
        errorCard: "#B3261E",
        successCard: "#34A853",
        infoCard: "#002D72",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        outfit: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
  important: true,
};
export default config;
