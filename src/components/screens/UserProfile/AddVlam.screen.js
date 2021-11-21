import React from 'react';

import StartNewVlamForm from '../../sections/forms/startNewVlam';

export default AddVlamScreen = (props) => {
  const { navigation, ...restProps } = props;
  return <StartNewVlamForm navigation={navigation} />;
};
