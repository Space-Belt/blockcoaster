import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import RickHead from '../assets/svg/rick.svg';
import Morty from '../assets/svg/mortie.svg';

const DEFAULT_WIDTH = 0;

const LearnAnimationScreen = () => {
  const [moveCount, setMoveCount] = useState<string>('');

  const percentage = useSharedValue<number>(DEFAULT_WIDTH);

  const stretchAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: percentage.value,
    };
  });

  const handleTextInput = (text: string) => {
    setMoveCount(text);
  };

  const handleMortieMove = () => {
    percentage.value = withTiming(Number(moveCount));
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Learn Animation</Text>
        <View style={styles.rickContainer}>
          <View style={styles.countMoveBox}>
            <TextInput
              value={moveCount}
              onChangeText={handleTextInput}
              style={styles.textInputStyle}
            />

            <TouchableOpacity
              onPress={handleMortieMove}
              style={styles.increaseCountBtn}>
              <Text style={styles.increaseCountBtnText}>Move</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rickHeadBox}>
            <Animated.View style={stretchAnimatedStyle}>
              <Morty />
            </Animated.View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LearnAnimationScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  rickContainer: {
    flex: 1,
  },
  countMoveBox: {
    flexDirection: 'row',
    gap: 5,
  },
  numberBox: {
    width: 63,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  numberBoxText: {
    lineHeight: 30,
    textAlign: 'center',
    color: '#000',
  },
  increaseCountBtn: {
    width: 50,
    height: 30,
    backgroundColor: '#8CD790',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  increaseCountBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  textInputStyle: {
    width: 63,
    height: 30,
    backgroundColor: '#fff',
  },
  rickHeadBox: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#EAEAEA',
    height: 80,
    borderRadius: 14,
    justifyContent: 'center',
    position: 'relative',
  },
  rickHeadSvg: {
    ...StyleSheet.absoluteFillObject,
  },
});
