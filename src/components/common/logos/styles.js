import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing(0.6),
    paddingHorizontal: theme.spacing(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.common,
  },
  tinyLogo: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  logoText: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(1.1),
    textTransform: 'capitalize',
    paddingHorizontal: theme.spacing(1),
  },
});
