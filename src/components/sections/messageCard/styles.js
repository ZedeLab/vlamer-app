import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingRight: '1%',
    borderBottomWidth: 0.6,
    borderBottomColor: 'rgba(0, 0, 0, .1)',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
  },
  content: {
    flex: 1,
    width: '100%',
    marginLeft: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  time: {
    color: 'rgba(0, 0, 0, .6)',
    fontSize: 12,
  },

  subContent: {
    width: '90%',
  },

  receiver: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: 'openSans',
  },
  message: {
    color: 'rgba(0, 0, 0, .6)',
    fontSize: 13,
    width: '100%',
    marginTop: 8,
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
