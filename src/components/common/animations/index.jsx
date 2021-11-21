import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoading } from '../../../store/loading';
import { useSpring, animated, config } from '@react-spring/native';

export const LottieAnimation = ({ src, loadFallBack, style, ...restProps }) => {
  const loading = useSelector(selectLoading);
  return (
    <View>
      {loading?.type === loadFallBack?.type ? (
        <LottieView
          source={loadFallBack.src}
          style={defaultStyles.loader}
          autoPlay
          loop
          {...restProps}
        />
      ) : (
        <LottieView source={src} autoPlay loop style={style} {...restProps} />
      )}
    </View>
  );
};

export const AnimatedNumberText = (props) => {
  const { textStyle, animProps, value, children } = props;

  const { number } = useSpring({
    x: 0,
    number: value,
    from: { number: 0 },
    reset: false,
    delay: 50,
    config: config.molasses,
  });

  return (
    <animated.Text style={textStyle} {...animProps}>
      {number.to((n) => n.toFixed(0))}
    </animated.Text>
  );
};

const defaultStyles = StyleSheet.create({
  loader: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: '10%',
  },
});

export const LottieIcon = ({ src, isActive, style, ...restProps }) => {
  return (
    <View>
      {isActive ? (
        <LottieView
          source={loadFallBack.src}
          style={defaultStyles.loader}
          autoPlay
          loop
          {...restProps}
        />
      ) : (
        <LottieView source={src} autoPlay loop style={style} {...restProps} />
      )}
    </View>
  );
};
