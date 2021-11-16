import * as React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { Banner, Headline, Subheading } from 'react-native-paper';
import { styles } from './styles';
import theme from '../../../utils/theme';

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
          source={require('../../../../assets/logo.png')}
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
