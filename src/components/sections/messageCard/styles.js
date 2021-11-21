import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, .1)',
    height: 120,
    justifyContent: 'center',
    paddingLeft: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
  },
  content: {
    flex: 1,
    marginLeft: '8%',
  },

  time: {
    color: 'rgba(0, 0, 0, .6)',
    fontSize: 12,
  },

  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sender: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'openSans',
  },
  message: {
    color: 'rgba(0, 0, 0, .6)',
    fontSize: 13,
    marginTop: 8,
  },
});
