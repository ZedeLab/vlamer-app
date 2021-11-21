import { StyleSheet } from 'react-native';
import theme from '../../../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    height: theme.spacing(6),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(1),
  },
  sectionContainer: {
    alignItems: 'center',
  },
  icon: {
    width: theme.spacing(3),
    height: theme.spacing(4),
  },
});
