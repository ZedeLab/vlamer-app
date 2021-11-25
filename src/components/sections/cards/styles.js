import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: theme.spacing(0.3),
  },
  mainSection: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing(0.2),
  },
  section: {
    width: '50%',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  description: {
    paddingHorizontal: theme.spacing(0.5),
    fontSize: theme.spacing(0.8),
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
  },
  smallPrimaryText: {
    fontFamily: 'openSans',
    fontSize: theme.spacing(0.7),
    color: theme.colors.textPrimary,
    paddingLeft: theme.spacing(0.1),
  },
  innerHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(0.5),
  },
  divider: {
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing(0.3),
    // marginHorizontal: theme.spacing(1),
    opacity: 0.7,
  },
  headerUserSection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerMainSection: {
    width: '65%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  status: {
    fontFamily: 'openSans-bold',
    textTransform: 'lowercase',
    textAlign: 'center',
    color: theme.colors.accent,
    fontSize: theme.spacing(0.6),
    // width: theme.spacing(10),
  },
  greenText: {
    fontSize: theme.spacing(1.2),
    color: theme.colors.success,
  },
  redText: {
    color: theme.colors.success,
  },
  icon: {
    justifyContent: 'center',
    width: theme.spacing(1.8),
    height: theme.spacing(1.8),
    marginHorizontal: theme.spacing(0.1),
  },
  icon_small: {
    justifyContent: 'center',
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBig: {
    justifyContent: 'center',
    // // backgroundColor: 'red',
    width: theme.spacing(2.8),
    height: theme.spacing(2.8),
  },

  iconHeartText: {
    marginLeft: -theme.spacing(0.5),
  },

  message: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing(0.3),
    marginVertical: theme.spacing(0.3),
  },
  messageContainer: {
    width: '95%',
  },

  iconHeart: {
    width: theme.spacing(3),
    height: theme.spacing(2.4),
    position: 'relative',
    top: theme.spacing(-0.05),
  },
});
