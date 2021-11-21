import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../utils/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.common,
  },
  chatList: {
    flex: 1,
    padding: '4%',
    paddingTop: '0%',
  },
});
