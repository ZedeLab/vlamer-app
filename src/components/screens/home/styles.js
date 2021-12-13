import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: theme.spacing(0.4),
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  text: {
    textAlign: 'center',
    fontFamily: 'playfair-display',
    letterSpacing: 2,
    color: '#fff',
    marginBottom: 25,
    fontSize: 25,
  },
  item: {
    width: '90%',
    height: theme.spacing(8),
    justifyContent: 'center',
  },
  firstName: {
    fontSize: 32,
  },

  modal: {
    ...theme.shadows[5],
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.common,
    ...theme.shadows[4],
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  modalHeader: {
    ...theme.shadows[5],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingBottom: '3%',
    paddingTop: '2%',
    height: 100,
    paddingHorizontal: '3%',
    ...theme.shadows[1],
  },
  replyButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 20,
  },
  buttonTextStyle: {
    color: theme.colors.common,
    fontSize: 12,
    textTransform: 'capitalize',
  },

  vlamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
    marginRight: 24,
  },
  text: {
    fontFamily: 'openSans',
    color: theme.colors.textPrimary,
    lineHeight: theme.spacing(1),
  },
  greyText: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(0.7),
    color: theme.colors.textDisabled,
    paddingLeft: theme.spacing(0.1),
  },
  modalVlamContent: {
    padding: '5%',
  },
  vlamContent: {
    padding: '5%',
    paddingVertical: '0%',
  },
  vlamDetails: {
    marginLeft: '-18%',
  },
  vlamMessage: {
    marginTop: 12,
  },

  divider: {
    margin: '3%',
    width: '92%',
    height: 4,
    backgroundColor: theme.colors.accent,
  },
  commentWritingSection: {
    padding: '3%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderRadius: 24,
    fontSize: theme.spacing(1),
    fontFamily: 'openSans',
    textAlignVertical: 'top',
    marginHorizontal: 12,
    borderRadius: 20,
    minHeight: 30,
    maxHeight: 140,
    marginLeft: 12,
  },
});
