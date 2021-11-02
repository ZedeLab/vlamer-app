import * as React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { Banner, Headline, Subheading } from 'react-native-paper';
import theme from '../../utils/theme';

export const CompleteRegistrationBanner = (props) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Banner
      visible={visible}
      style={(styles.container, visible ? styles.containerActive : styles.containerOff)}
      actions={[
        {
          label: 'Send again',

          onPress: () => setVisible(false),
        },
        {
          label: 'Dismiss',
          onPress: () => setVisible(false),
        },
      ]}
      icon={({ size }) => (
        <Image
          source={require('../../../assets/logo.png')}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
    >
      <View style={styles.textContainer}>
        <Subheading style={styles.title}>welcome to Vlamer ❤️</Subheading>
        <Text style={styles.content}>Please verify your email to proceed</Text>
      </View>
    </Banner>
  );
};

const styles = StyleSheet.create({
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
