import React from "react";
import theme from "../../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

export const TabBarIcon = ({
  focused,
  color,
  size,
  iconName,
  ...restProps
}) => {
  return (
    <Ionicons
      {...restProps}
      name={iconName}
      size={size}
      color={focused ? theme.colors.accent : theme.colors.textSecondary}
    />
  );
};

export const AvatarIcon = ({ focused, color, size, imgSrc, ...restProps }) => {
  return (
    <Avatar.Image
      size={size}
      source={require("../../../assets/avatar_f.jpg")}
      {...restProps}
    />
  );
};
