import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { styles as defaultStyles } from './styles';

export const SuccessButton = ({ style, outlined, children, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={{
        ...defaultStyles.button,
        ...defaultStyles.SuccessButton,
      }}
    >
      <Text style={{ ...defaultStyles.buttonText, ...defaultStyles.customButtonText }}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

export const DangerButton = ({ style, outlined, children, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={{
        ...defaultStyles.button,
        ...defaultStyles.dangerButton,
      }}
    >
      <Text style={{ ...defaultStyles.buttonText, ...defaultStyles.customButtonText }}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

export const PrimaryButton = ({ style, outlined, children, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={
        outlined
          ? {
              ...defaultStyles.button,
              ...style,
              ...defaultStyles.outlinedPrimary,
            }
          : {
              ...defaultStyles.button,
              ...defaultStyles.primaryButton,
              ...style,
            }
      }
    >
      <Text style={outlined ? defaultStyles.buttonText_outlined : defaultStyles.buttonText}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

export const SecondaryButton = ({ style, outlined, children, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={
        outlined
          ? {
              ...defaultStyles.button,
              ...style,
              ...defaultStyles.outlinedSecondary,
            }
          : {
              ...defaultStyles.button,
              ...style,
              ...defaultStyles.secondaryButton,
            }
      }
    >
      <Text style={outlined ? defaultStyles.buttonText_outlined : defaultStyles.buttonText}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

export const FacebookLoginButton = ({ style, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={{ ...style, ...defaultStyles.button, ...defaultStyles.facebook }}
    >
      <View style={defaultStyles.buttonContent}>
        <Ionicons size={20} style={defaultStyles.icon} name="logo-facebook" />
        <Text style={defaultStyles.buttonText}>Login with Facebook</Text>
      </View>
    </TouchableHighlight>
  );
};

export const GoogleLoginButton = ({ style, ...restProps }) => {
  return (
    <TouchableHighlight
      {...restProps}
      style={{ ...style, ...defaultStyles.button, ...defaultStyles.google }}
    >
      <View style={defaultStyles.buttonContent}>
        <Ionicons size={20} style={defaultStyles.icon_dark} name="logo-google" />
        <Text style={defaultStyles.buttonText_dark}>Login with Google</Text>
      </View>
    </TouchableHighlight>
  );
};
