import React from "react";
import theme from "../../utils/theme";
import { Ionicons } from "@expo/vector-icons";

export const TabBarIcon = ({
  focused,
  color,
  size,
  iconName,
  ...restProps
}) => {
  return (
    <Ionicons
      name={iconName}
      size={size}
      color={focused ? theme.colors.accent : theme.colors.textSecondary}
    />
  );
};
