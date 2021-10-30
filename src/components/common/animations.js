import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "../../store/loading";

export const LottieAnimation = ({ src, loadFallBack, style, ...restProps }) => {
  const loading = useSelector(selectLoading);
  return (
    <View>
      {loading?.type === loadFallBack.type ? (
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

const defaultStyles = StyleSheet.create({
  loader: {
    width: "100%",
    alignSelf: "center",
    paddingVertical: "10%",
  },
});
