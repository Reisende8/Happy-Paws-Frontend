import { extendTheme } from "@chakra-ui/react";

const themeColors = {
  offWhite: "#ffe3d2",
  primary: {
    100: "#ffdac4",
    200: "#ffc29d",
    300: "#ffa976",
    400: "#ff914e",
    500: "#ff7827",
    600: "#ff6000",
    700: "#d85100",
    800: "#b14200",
    900: "#893400",
  },
  secondary: {
    100: "#c7f1c7",
    200: "#a2e8a2",
    300: "#7ddf7d",
    400: "#57d657",
    500: "#32cd32",
    600: "#29a829",
    700: "#208220",
    800: "#175d17",
    900: "#0e380e",
  },
  danger: {
    100: "#ed9191",
    200: "#e87272",
    300: "#e35353",
    400: "#de3333",
    500: "#cc2121",
    600: "#ac1c1c",
    700: "#8d1717",
    800: "#6e1212",
    900: "#4e0d0d",
  },
  warning: {
    100: "#fef3a5",
    200: "#fdee81",
    300: "#fde95d",
    400: "#fce439",
    500: "#fcdf15",
    600: "#e9cd03",
    700: "#c6ad03",
    800: "#a28e02",
    900: "#7e6e02",
  },
};

export const theme = extendTheme({
  colors: themeColors,
  fonts: {
    heading: "Quicksand",
    body: "Quicksand",
  },
});
