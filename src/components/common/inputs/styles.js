import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },

  textInput: {
    height: theme.spacing(4.5),
    backgroundColor: theme.colors.common,
    marginBottom: theme.spacing(1),
    borderColor: 'transparent',
    borderWidth: theme.spacing(0.01),
    borderRadius: theme.spacing(1),
    fontSize: theme.spacing(0.8),
    fontFamily: 'openSans',
  },
  label: {
    marginBottom: theme.spacing(0.5),
    color: theme.colors.textPrimary,
    letterSpacing: theme.spacing(0.1),
    fontSize: theme.spacing(0.8),
    fontFamily: 'openSans',
  },

  errorText: {
    fontSize: theme.spacing(0.8),
    color: theme.colors.error,
    alignSelf: 'center',
  },
});
