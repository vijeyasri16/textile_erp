import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const breakpoints = {
  base: "0px",
  xs: "360px",
  sm: "568px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1920px",
};

const fontSizes = {
  base: "10px",
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  "2xl": "30px",
  "3xl": "36px",
  "4xl": "48px",
  "5xl": "60px",
};

const lineHeights = {
  base: "1.2",
  xs: "1.4",
  sm: "1.5",
  md: "1.6",
  lg: "1.7",
  xl: "1.8",
  "2xl": "1.9",
  "3xl": "2",
  "4xl": "2.1",
  "5xl": "2.2",
};

const colors = {
  primary: {
    50: "#d1cfcf",
    100: "#cccaca",
    200: "#b5b3b3",
    300: "#9c9a9a",
    400: "#858383",
    500: "#353535",
    600: "#292828",
    700: "#141414",
  },
  brand: {
    50: "#e0f2ff",
    100: "#b8dcff",
    200: "#8ac5ff",
    300: "#5cadff",
    400: "#2e96ff",
    500: "#007fff",
    600: "#0065cc",
    700: "#004b99",
    800: "#003266",
    900: "#f1f1f1",
  },
  accent: {
    50: "#f5e6ff",
    100: "#dbb8ff",
    200: "#c28aff",
    300: "#a85cff",
    400: "#8f2eff",
    500: "#7600ff",
    600: "#5e00cc",
    700: "#460099",
    800: "#2e0066",
    900: "#170033",
  },
};

const theme = extendTheme({
  config,
  breakpoints,
  colors,
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
  fontSizes,
  lineHeights,
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        cursor: "pointer",
      },
      variants: {
        solid: (props: StyleFunctionProps) => ({
          bg: mode("gray.200", "gray.600")(props),
          color: mode("black", "white")(props),
          _hover: {
            bg: mode("black", "white")(props),
            color: mode("white", "black")(props),
          },
        }),
        outline: (props: StyleFunctionProps) => ({
          borderColor: mode(
            `${props.colorScheme}.500`,
            `${props.colorScheme}.200`,
          )(props),
          color: mode(
            `${props.colorScheme}.500`,
            `${props.colorScheme}.200`,
          )(props),
          _hover: {
            bg: mode(
              `${props.colorScheme}.50`,
              `${props.colorScheme}.700`,
            )(props),
            borderColor: mode(
              `${props.colorScheme}.600`,
              `${props.colorScheme}.300`,
            )(props),
            color: mode(
              `${props.colorScheme}.600`,
              `${props.colorScheme}.300`,
            )(props),
          },
        }),
        ghost: (props: StyleFunctionProps) => ({
          color: mode(
            `${props.colorScheme}.500`,
            `${props.colorScheme}.200`,
          )(props),
          _hover: {
            bg: mode("gray.300", "gray.600")(props),
          },
        }),
      },
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Link: {
      baseStyle: (props: StyleFunctionProps) => ({
        color: mode(
          `${props.colorScheme}.500`,
          `${props.colorScheme}.200`,
        )(props),
        _hover: {
          color: mode(
            `${props.colorScheme}.600`,
            `${props.colorScheme}.300`,
          )(props),
          textDecoration: "underline",
          cursor: "pointer",
        },
      }),
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Checkbox: {
      baseStyle: (props: StyleFunctionProps) => ({
        control: {
          _hover: {
            bg: mode(
              `${props.colorScheme}.50`,
              `${props.colorScheme}.700`,
            )(props),
          },
          cursor: "pointer",
        },
      }),
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Radio: {
      baseStyle: (props: StyleFunctionProps) => ({
        control: {
          _hover: {
            bg: mode(
              `${props.colorScheme}.50`,
              `${props.colorScheme}.700`,
            )(props),
          },
          cursor: "pointer",
        },
      }),
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Table: {
      baseStyle: (props: StyleFunctionProps) => ({
        th: {
          color: mode("gray.600", "gray.400")(props),
          borderBottom: "1px solid",
          borderBottomColor: mode("gray.200", "gray.700")(props),
          fontWeight: "bold",
        },
        td: {
          color: mode("gray.800", "gray.200")(props),
          borderBottom: "1px solid",
          borderBottomColor: mode("gray.200", "gray.700")(props),
        },
        tr: {
          _hover: {
            bg: mode("gray.100", "gray.700")(props),
          },
          cursor: "pointer",
        },
        caption: {
          color: mode("gray.600", "gray.400")(props),
        },
        table: {
          bg: mode("white", "gray.800")(props),
          borderRadius: "md",
          boxShadow: mode("md", "dark-lg")(props),
        },
      }),
      defaultProps: {
        variant: "simple",
        size: "md",
      },
    },
    Switch: {
      baseStyle: (props: StyleFunctionProps) => ({
        track: {
          _hover: {
            bg: mode(
              `${props.colorScheme}.200`,
              `${props.colorScheme}.600`,
            )(props),
          },
        },
      }),
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Menu: {
      baseStyle: (props: StyleFunctionProps) => ({
        item: {
          _hover: {
            bg: mode("gray.100", "gray.600")(props),
          },
          cursor: "pointer",
        },
      }),
    },
    Tabs: {
      baseStyle: (props: StyleFunctionProps) => ({
        tab: {
          color: mode("black", "blue.300")(props),
          _hover: {
            bg: mode("black", "white")(props),
            color: mode("white", "black")(props),
          },
          cursor: "pointer",
        },
      }),
      defaultProps: {
        colorScheme: "primary",
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "gray.800")(props),
      },
      "input:hover, textarea:hover, select:hover": {
        borderColor: mode("primary.300", "primary.600")(props),
      },
      "input:focus, textarea:focus, select:focus": {
        borderColor: mode("primary.500", "primary.200")(props),
        boxShadow: mode(
          "0 0 0 1px var(--chakra-colors-primary-500)",
          "0 0 0 1px var(--chakra-colors-primary-200)",
        )(props),
      },
    }),
  },
});

export default theme;
