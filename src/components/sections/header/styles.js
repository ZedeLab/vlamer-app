import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  header: {
    // height: theme.spacing(5),
    ...theme.shadows[2],
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    flexDirection: 'row',
    width: theme.spacing(5),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    color: theme.colors.textPrimary,
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(0.9),
  },
});
