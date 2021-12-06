import { StyleSheet } from 'react-native';
import theme from '../../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    margin: theme.spacing(0.3),

    padding: theme.spacing(0.5),
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.common,
    borderRadius: theme.shapes.borderRadios,
    ...theme.shadows[1],
  },
  userInfoContainer: {
    paddingLeft: theme.spacing(0.1),
    flexDirection: 'row',
  },

  text: {
    fontFamily: 'openSans',
    color: theme.colors.textPrimary,
    lineHeight: theme.spacing(1),
  },
  title: {
    fontSize: theme.spacing(1),
    textTransform: 'capitalize',
    color: theme.colors.textPrimary,
  },

  highlight: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(0.7),
    color: theme.colors.accent,
    textTransform: 'lowercase',
  },
  greyText: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(0.7),
    color: theme.colors.textDisabled,
    paddingLeft: theme.spacing(0.1),
    textTransform: 'lowercase',
  },

  contentContainer: {
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },

  message: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing(0.3),
    marginVertical: theme.spacing(0.3),
  },
  button: {
    width: theme.spacing(5),
  },

  button_fullWidth: {
    alignSelf: 'stretch',
  },

  actionContainer: {
    flexDirection: 'row',
  },

  rowContainer: {
    flexDirection: 'row',
  },
});
