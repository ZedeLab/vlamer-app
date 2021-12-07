import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: `rgba(255, 255, 255, .4)`,
    flex: 1,
  },

  header: {
    height: 80,
    marginTop: -30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: '10%',
    paddingBottom: '3%',
    paddingHorizontal: '3%',
    ...theme.shadows[1],
  },
  name: {
    fontSize: 16,
    textTransform: 'capitalize',
  },

  footer: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
    marginLeft: 4,
    backgroundColor: `rgb(255, 255, 255)`,
  },

  inputContainer: {
    flex: 2,
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    backgroundColor: theme.colors.paper,
    borderColor: 'transparent',
    borderRadius: 24,
    fontSize: theme.spacing(1),
    fontFamily: 'openSans',
    textAlignVertical: 'top',
    marginHorizontal: 12,
    borderRadius: 20,
    padding: 12,
    minHeight: 30,
    maxHeight: 140,
  },
  sendIcon: {},

  conversation: {
    flex: 1,
    marginHorizontal: 12,
    marginTop: 24,
    paddingBottom: 90,
  },

  message: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
});
