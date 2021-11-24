import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

  loaderContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  iconBig: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: 'transparent',
  },
});
