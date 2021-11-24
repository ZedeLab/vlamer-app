import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  botAnim: {
    marginTop: theme.spacing(1),
    width: '40%',
    alignSelf: 'center',
  },
});
