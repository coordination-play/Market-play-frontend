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
      heroGradientEnd: {
        default: "#66CCCC", // Medium light teal, softer and lighter
        _dark: "#66CCCC",   // Same medium light teal for both light and dark themes for consistency
      },
      heroGradientStart: {
        default: "#006666", // Dark teal, rich and deep
        _dark: "#006666",   // Same dark teal for both light and dark themes for uniformity
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
