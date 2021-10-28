import { DefaultTheme } from "react-native-paper";

export default theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0E141A",
    accent: "#f1c40f",
    background: "#F7F7F9",
    divider: "#D8D9D4",
    textPrimary: "#F7F7F9",
    textSecondary: "#0E141A",
  },
  spacing: (size) => size * 16,
};
