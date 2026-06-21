import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        // Premium typography scale
        "display-2xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "500" }],
        "display-xl": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "500" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "500" }],
        "display-md": ["clamp(1.875rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" }],
        "display-sm": ["clamp(1.5rem, 2.2vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "500" }],
        "eyebrow": ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em", fontWeight: "500" }],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // ─── Koffelo Atelier Palette — Editorial richness ───
        // Deep coffee blacks (dominant dark surface)
        "k-black": "#0E0805",        // near-black coffee
        "k-espresso": "#1A0F08",     // primary dark surface
        "k-coffee": "#2A1810",       // rich coffee
        "k-mocha": "#3D2418",        // mocha
        "k-walnut": "#5C3A21",       // walnut
        "k-caramel": "#8A5A33",      // caramel

        // Creams (light surfaces)
        "k-ivory": "#F4ECD8",        // primary ivory — warmer than before
        "k-paper": "#FAF4E4",        // lightest paper
        "k-cream": "#EFE4CC",        // deeper cream
        "k-cream-50": "#F7EFDB",     // mid cream
        "k-cream-100": "#EAD9B8",    // sand cream
        "k-cream-200": "#D9C39A",    // border / divider
        "k-sand": "#C9B083",         // muted sand
        // Aliases (back-compat)

        // Accents — copper & gold
        "k-copper": "#B5651D",       // burnt copper (rich accent)
        "k-copper-light": "#C97D33", // brighter copper
        "k-gold": "#C8932D",         // burnished gold
        "k-gold-light": "#E0B868",   // light gold
        "k-amber": "#D9A03E",        // amber

        // Optional accent — oxblood (for occasional richness)
        "k-oxblood": "#5C1F1A",
        "k-rust": "#8B3A1E",

        // Text helpers
        "k-ink": "#0E0805",          // primary dark text on light
        "k-ink-muted": "#6B5444",    // muted body text on light
        "k-ink-light": "#F4ECD8",    // primary light text on dark
        "k-ink-light-muted": "rgba(244, 236, 216, 0.65)", // muted light text

        // ─── Legacy brand-* aliases (preserved for existing components) ───
        "brand-bg": "#F5EFE4",
        "brand-nav": "#E1CBA0",
        "brand-accent": "#C8932D",
        "brand-dark": "#3D2418",
        "brand-darker": "#2A1810",
        "brand-offer-bg": "#F2EADB",
        "brand-offer-border": "#2A1810",
        "brand-offer-btn": "#7B4A2D",
        "brand-slider-bg": "#D9A94A",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "section": "clamp(4rem, 8vw, 7rem)",
      },
      letterSpacing: {
        "tightest": "-0.04em",
        "wider-2": "0.15em",
        "wider-3": "0.2em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      boxShadow: {
        "soft": "0 2px 8px -2px rgba(42, 24, 16, 0.08)",
        "medium": "0 8px 24px -4px rgba(42, 24, 16, 0.12)",
        "premium": "0 20px 50px -12px rgba(42, 24, 16, 0.18)",
        "inner-soft": "inset 0 1px 2px 0 rgba(42, 24, 16, 0.05)",
        "gold-glow": "0 8px 28px -6px rgba(200, 147, 45, 0.45)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.09 0 0 0 0 0.06 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        "radial-cream": "radial-gradient(ellipse at top, #FAF6EE 0%, #F5EFE4 60%, #EFE5D2 100%)",
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "reveal": {
          from: { clipPath: "inset(0 100% 0 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in-down": "fade-in-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "marquee": "marquee 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "reveal": "reveal 1.1s cubic-bezier(0.76, 0, 0.24, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
