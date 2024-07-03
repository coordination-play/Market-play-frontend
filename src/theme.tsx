import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
      heroGradientStart: {
        default: "#00BFFF", // Deep Sky Blue, a vibrant cyan-blue
        _dark: "#008B8B",   // Dark Cyan, more muted for dark themes
      },
      heroGradientEnd: {
        default: "#0000FF", // Pure Blue
        _dark: "#00008B",   // Dark Blue, deeper for enhanced contrast in dark themes
      },
      
      
    },
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
});

export default theme;
