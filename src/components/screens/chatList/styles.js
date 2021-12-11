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

  modal: {
    ...theme.shadows[5],
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '94%',
    backgroundColor: theme.colors.common,
    ...theme.shadows[4],
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  modalHeader: {
    padding: 12,
    width: '100%',
    paddingLeft: 16,
    backgroundColor: '#e8efee',
  },

  modalHeaderTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  modalTitle: {
    marginLeft: -12,
    fontFamily: 'openSans-bold',
    fontSize: 14,
  },
  searchbar: {
    fontSize: 12,
    borderRadius: 12,
    marginTop: 12,
    height: 36,
    fontSize: 12,
    shadowOpacity: 0,
  },
  user: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    borderBottomWidth: 0.4,
    borderColor: 'rgba(0, 0, 0, .13)',
  },
  name: {
    marginLeft: 12,
  },
});
