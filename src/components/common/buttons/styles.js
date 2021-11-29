import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  button: {
    justifyContent: 'space-around',
    elevation: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    paddingVertical: theme.spacing(0.3),
  },
  buttonContent: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingVertical: theme.spacing(0.3),
  },
  facebook: {
    backgroundColor: '#4267b2',
    color: 'white',
    borderColor: '#4267b2',
  },

  google: {
    backgroundColor: theme.colors.paper,
    borderColor: theme.colors.paper,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing(0.8),
    ...theme.shadows[4],
  },
  secondaryButton: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.primary,
  },

  buttonText: {
    fontFamily: 'openSans-bold',
    fontSize: theme.spacing(0.8),
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    alignSelf: 'center',
    textTransform: 'capitalize',
    paddingHorizontal: theme.spacing(1),
  },
  buttonText_dark: {
    fontFamily: 'openSans-bold',
    fontSize: theme.spacing(0.8),
    color: theme.colors.textPrimary,
    letterSpacing: 2,
    alignSelf: 'center',
    textTransform: 'capitalize',
    // paddingHorizontal: theme.spacing(1),
  },
  icon: {
    color: theme.colors.textSecondary,
  },
  icon_dark: {
    color: theme.colors.textPrimary,
  },

  outlinedPrimary: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.accent,
    borderWidth: theme.spacing(0.05),

    borderRadius: theme.shapes.borderRadios,
  },

  outlinedSecondary: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
    borderWidth: theme.spacing(0.05),
    borderRadius: theme.shapes.borderRadios,
  },

  buttonText_outlined: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(0.8),
    color: theme.colors.textPrimary,
    letterSpacing: 2,
    alignSelf: 'center',
    textTransform: 'capitalize',
    paddingHorizontal: theme.spacing(1),
  },

  dangerButton: {
    backgroundColor: theme.colors.error,
  },

  customButtonText: {
    fontSize: theme.spacing(0.65),
  },

  SuccessButton: {
    backgroundColor: theme.colors.success,
  },
});
