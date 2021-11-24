import * as React from 'react';

import { Image, Text, View } from 'react-native';
import { Banner, Subheading } from 'react-native-paper';
import { styles } from './styles';

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
