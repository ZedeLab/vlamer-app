import React from 'react';
import theme from '../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { ProgressBar } from 'react-native-paper';

export const TabBarIcon = ({ focused, color, size, iconName, ...restProps }) => {
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
  if (!imgSrc) {
    return <ProgressBar progress={0.5} color={theme.colors.accent} />;
  }
  return (
    <Avatar.Image
      size={size}
      source={{
        uri: imgSrc,
      }}
      {...restProps}
    />
  );
};
