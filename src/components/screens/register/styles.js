import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  animContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  scrollView: {
    width: '100%',
    minHeight: '100%',
    minHeight: theme.spacing(35),
  },
  botAnim: {
    // marginTop: theme.spacing(1),
    width: '35%',
    alignSelf: 'center',
  },
});
