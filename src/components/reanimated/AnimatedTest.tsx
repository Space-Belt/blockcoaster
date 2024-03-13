import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';

const DEFAULT_WIDTH = 20;

const AnimatedTest = () => {
  const myWidth = useRef(new Animated.Value(DEFAULT_WIDTH)).current;
  const tempWidthValue = useRef(DEFAULT_WIDTH);

  const expandWidth = () => {
    tempWidthValue.current += 20;

    Animated.timing(myWidth, {
      toValue: tempWidthValue.current,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      <Text>AnimatedTest</Text>
      <TouchableOpacity onPress={expandWidth} style={styles.stretchBtn}>
        <Text style={styles.stretchBtnText}>Stretch</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.emptyBox,
          {
            width: myWidth,
          },
        ]}
      />
    </View>
  );
};

export default AnimatedTest;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  emptyBox: {
    width: 50,
    height: 50,
    backgroundColor: '#1c61ab',
  },
  stretchBtn: {
    width: 100,
    height: 30,
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  stretchBtnText: {},
});
