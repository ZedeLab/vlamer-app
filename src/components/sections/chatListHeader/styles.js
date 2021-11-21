import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: '15%',
    paddingBottom: '4%',
    paddingHorizontal: '3%',
    ...theme.shadows[1],
  },
  title: {
    fontSize: 18,
  },
});
