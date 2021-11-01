import { DefaultTheme } from "react-native-paper";

export default theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    common: "#fff",
    primary: "#0E141A",
    primary_light: "#223140",
    accent: "#36B8A0",
    background: "#F7F7F9",
    paper: "#EAEAEB",
    divider: "#36B8A0",
    success: "#4caf50",
    textPrimary: "#223140",
    textSecondary: "#fff",
    textDisabled: "#B8B8B8",
    error: "#f44336",
  },
  spacing: (size) => size * 16,
  shapes: {
    borderRadios: 8,
  },
  shadows: [
    {
      shadowColor: "#36B8A0",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,

      elevation: 0,
    },
    {
      shadowColor: "#36B8A0",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    {
      shadowColor: "#36B8A0",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    {
      shadowColor: "#36B8A0",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
    {
      shadowColor: "#36B8A0",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,

      elevation: 11,
    },
  ],
};
