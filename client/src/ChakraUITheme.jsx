import { extendTheme } from "@chakra-ui/react";

const ChakraUICustomizedTheme = extendTheme({
  colors: {
    brandBlack: {
      50: "#666666",
      100: "#5C5C5C",
      200: "#525252",
      300: "#474747",
      400: "#3D3D3D",
      500: "#333333",
      600: "#292929",
      700: "#292929",
      800: "#1F1F1F",
      900: "#0A0A0A",
    },
    accent: {
      50: "#FBB860",
      100: "#FAAF4C",
      200: "#FAA638",
      300: "#F99D24",
      400: "#F99410",
      500: "#EF8A06",
      600: "#DB7E06",
      700: "#C77305",
      800: "#B36705",
      900: "#9F5C04",
    },
    offWhite: "#f1f1f1",
    platinum: "#E0E0E0",
    black: "#232323",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "200",
      },
      variant: {
        "outline-2": {
          borderRadius: "full",
          borderWidth: "4px",
          borderColor: "red.500",
          bg: "red.300",
        },
      },
    },
    Skeleton: {
      // TODO -> color not changing
      defaultProps: {
        startColor: "#2084d6",
        endColor: "#d60c0c",
      },
    },
  },
});

export default ChakraUICustomizedTheme;
