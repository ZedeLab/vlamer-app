import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../utils/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.common,
    position: 'relative',
  },
  chatList: {
    flex: 1,
    padding: '4%',
    paddingTop: '0%',
  },

  modal: {},
  modalContent: {
    position: 'absolute',
    bottom: 0,
    padding: 12,
    width: '100%',
    height: '94%',
    backgroundColor: theme.colors.common,
    ...theme.shadows[4],
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  modalTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalTitleText: {
    flex: 1,
  },
});
