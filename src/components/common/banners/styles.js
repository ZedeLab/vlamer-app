import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerActive: {
    marginTop: theme.spacing(15),
  },
  containerOff: {
    marginBottom: theme.spacing(0.3),
  },
  container: {
    justifyContent: 'flex-start',
    borderRadius: theme.shapes.borderRadios,
    ...theme.shadows[1],
  },
  title: {
    fontFamily: 'openSans-bold',

    fontSize: theme.spacing(1.1),
    color: theme.colors.textPrimary,
    letterSpacing: 2,
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginBottom: theme.spacing(0.7),
  },
  textContainer: {},
  content: {
    fontSize: theme.spacing(0.9),
    color: theme.colors.textPrimary,
  },
});
