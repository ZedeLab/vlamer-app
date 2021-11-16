import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: theme.colors.common,
    paddingHorizontal: 0,
  },

  coverImageContainer: {
    width: Dimensions.get('window').width,
    height: theme.spacing(11),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  coverImage: {
    width: Dimensions.get('window').width,
    height: theme.spacing(11),
    opacity: 0.7,
  },

  sectionContainer: {
    justifyContent: 'center',
    backgroundColor: theme.colors.backdrop_light,
    height: theme.spacing(4),
    paddingHorizontal: theme.spacing(0.4),
    borderRadius: theme.shapes.borderRadios,
    ...theme.shadows[4],
    alignSelf: 'center',
  },

  actionsContainer: {
    alignItems: 'flex-end',
  },

  sectionsWrapper: {
    flexDirection: 'row',
    height: theme.spacing(12),
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(1),
  },

  userInfoSection: {
    paddingTop: theme.spacing(2.8),
  },

  accountCallToActions: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatarContainer: {
    alignSelf: 'flex-end',
    position: 'relative',
    bottom: -theme.spacing(2.2),
    // left: theme.spacing(1),
  },

  editButton: {
    height: theme.spacing(2),
  },

  text: {
    fontFamily: 'openSans-bold',
    textAlign: 'center',
    fontSize: theme.spacing(0.7),
    color: theme.colors.textPrimary,
  },
  stateText: {
    color: theme.colors.accent_dark,
    ...theme.shadows[4],
  },

  displayName: {
    textAlign: 'left',
    fontSize: theme.spacing(1.3),
    color: theme.colors.textPrimary,
  },
  userName: {
    textAlign: 'left',
    color: theme.colors.textDisabled,
  },

  bio: {
    textAlign: 'left',
    fontFamily: 'openSans',
    color: theme.colors.textPrimary,
    marginTop: theme.spacing(1),
  },

  lottieIcon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    margin: 0,
  },

  accountStatusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.textPrimary,

    padding: theme.spacing(0.1),
    borderRadius: theme.shapes.borderRadios,
    // marginLeft: theme.spacing(1),
  },
  accountStatusContainerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountStatus: {
    fontFamily: 'openSans-bold',
    color: theme.colors.textPrimary,
    fontSize: theme.spacing(0.8),
    textTransform: 'capitalize',
    alignSelf: 'center',
    marginRight: theme.spacing(0.5),
  },
  accountStatusText: {
    fontFamily: 'openSans',
    color: theme.colors.textPrimary,
    fontSize: theme.spacing(0.9),
  },

  accountStatus_highlighted: {
    color: theme.colors.accent,
  },

  greyText: {
    color: theme.colors.textDisabled,
  },
  thinText: {
    fontFamily: 'openSans',
  },
});
