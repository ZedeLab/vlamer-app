import React from 'react';
import { View, Text } from 'react-native';
import { useToast, IN_APP_NOTIFICATION_TYPES } from '../../services/toast';
import theme from '../../utils/theme';

const colors = {
  [IN_APP_NOTIFICATION_TYPES.SUCCESS]: '#42ba96',
  [IN_APP_NOTIFICATION_TYPES.FAILURE]: '#fa113d',
  [IN_APP_NOTIFICATION_TYPES.DEFAULT]: '#808080',
};

const Toast = () => {
  const { toastData } = useToast();

  if (toastData.show) {
    return (
      <View style={{ ...styles.toast, backgroundColor: colors[toastData.type] }}>
        <Text style={{ color: 'white', fontSize: 14 }}>{toastData.message}</Text>
      </View>
    );
  }
  return null;
};

const styles = {
  toast: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    width: '90%',
    position: 'absolute',
    top: '5%',
    ...theme.shadows[4],
  },
};

export default Toast;
