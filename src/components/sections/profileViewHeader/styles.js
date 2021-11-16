import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    // height: theme.spacing(5),
    ...theme.shadows[2],
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.common,
  },
  top: {
    backgroundColor: theme.colors.common,
  },

  avatar: {
    margin: theme.spacing(0.5),
    ...theme.shadows[2],
  },
  ctaContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: theme.spacing(8),
    alignItems: 'center',
  },
  icon: {
    color: theme.colors.textPrimary,
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(0.9),
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.spacing(1.2),
    textTransform: 'capitalize',
  },
});
