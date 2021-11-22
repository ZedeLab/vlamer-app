import React from 'react';
import { StyleSheet } from 'react-native';
import { VoltAccessProvider } from '../../services/voltAccess';
import theme from '../../utils/theme';

export const ServicesProviderWrapper = (props) => {
  const { children } = props;

  return <VoltAccessProvider>{children}</VoltAccessProvider>;
};

export default ServicesProviderWrapper;
