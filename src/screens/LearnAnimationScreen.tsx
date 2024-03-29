import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  Alert,
  Easing,
  LayoutChangeEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
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
import HorizontalMove from '../components/reanimated/HorizontalMove';
import VerticalMove from '../components/reanimated/VerticalMove';
import AnimatedTest from '../components/reanimated/AnimatedTest';

export interface LayoutRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}
const DEFAULT_PADDING = 10;
const IMG_WIDTH = 51;

const LearnAnimationScreen = () => {
  const DEFAULT_WIDTH = 0;
  const DEFAULT_DEGREE = 0;

  const [moveCount, setMoveCount] = useState<string>('');
  const [rotateDegree, setRotateDegree] = useState<string>('');
  const [firstSwitchOn, setFirstSwitchOn] = useState<boolean>(false);

  // 오른쪽 왼쪽 만나는 애니메이션
  const [kissContainerWidth, setKissContainerWidth] = useState<number>(0);

  const percentage = useSharedValue<number>(DEFAULT_WIDTH);
  const degrees = useSharedValue<number>(DEFAULT_DEGREE);

  const positionMove = useSharedValue<number>(10);

  const stretchAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: percentage.value,
    };
  });

  const rotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${degrees.value}deg`}],
    };
  });

  const kissAnimatedStyle = (direction: 'left' | 'right') =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedStyle(() => {
      return direction === 'left'
        ? {
            left: positionMove.value,
          }
        : {
            right: positionMove.value,
          };
    });

  const handleTextInput = (text: string, type: string) => {
    if (type === 'first') {
      setMoveCount(text);
    } else if (type === 'second') {
      setRotateDegree(text);
    }
  };

  const handleMortieMove = (movement: string) => {
    if (movement === 'right') {
      percentage.value = withTiming(Number(moveCount));
    } else if (movement === 'rotate') {
      degrees.value = withSpring(Number(rotateDegree));
    }
  };

  const handleToggleSwitch = () => {
    setFirstSwitchOn(prev => !prev);
  };

  useEffect(() => {
    positionMove.value = withTiming(
      firstSwitchOn ? kissContainerWidth - IMG_WIDTH : DEFAULT_PADDING,
      {
        duration: 1000,
      },
    );
  }, [firstSwitchOn]);

  const onFirstContainerLayout = useCallback(
    (nativeEvent: LayoutChangeEvent) => {
      const {width} = nativeEvent.nativeEvent.layout;
      setKissContainerWidth(width / 2 - DEFAULT_PADDING);
    },
    [],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerText}>Learn Animation</Text>
          <AnimatedTest />
          <View style={styles.rickContainer}>
            {/* 오른쪽이동 */}
            <View style={styles.countMoveBox}>
              <TextInput
                value={moveCount}
                onChangeText={(text: string) => handleTextInput(text, 'first')}
                style={styles.textInputStyle}
              />
              <TouchableOpacity
                onPress={() => handleMortieMove('right')}
                style={styles.increaseCountBtn}>
                <Text style={styles.increaseCountBtnText}>Move</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rickHeadBox}>
              <Animated.View style={stretchAnimatedStyle}>
                <Morty />
              </Animated.View>
            </View>
            {/* 로테이트 */}
            <View style={styles.countMoveBox}>
              <TextInput
                value={rotateDegree}
                onChangeText={(text: string) => handleTextInput(text, 'second')}
                style={styles.textInputStyle}
              />

              <TouchableOpacity
                onPress={() => handleMortieMove('rotate')}
                style={styles.increaseCountBtn}>
                <Text style={styles.increaseCountBtnText}>Rotate</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rotateBox}>
              <Animated.View style={rotateAnimatedStyle}>
                <Morty />
              </Animated.View>
            </View>
            {/* 가운데로 모으기 */}
            <View style={styles.countMoveBox}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={firstSwitchOn ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleToggleSwitch}
                value={firstSwitchOn}
              />
            </View>
            <View
              style={styles.rickKissBox}
              onLayout={(e: LayoutChangeEvent) => onFirstContainerLayout(e)}>
              <Animated.View
                style={[styles.leftRickIcon, kissAnimatedStyle('left')]}>
                <Morty />
              </Animated.View>
              <Animated.View
                style={[styles.rightRickIcon, kissAnimatedStyle('right')]}>
                <Morty />
              </Animated.View>
            </View>
            {/* 가로 움직임 */}
            <HorizontalMove />
            <VerticalMove />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearnAnimationScreen;

const styles = StyleSheet.create({
  rotateBox: {
    width: IMG_WIDTH,
    height: IMG_WIDTH,
  },
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
    marginBottom: 20,
  },
  rickContainer: {
    flex: 1,
    gap: 20,
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
  rickKissBox: {
    flexDirection: 'row',
    height: 80,
    borderWidth: 2,
    borderColor: '#EAEAEA',
    borderRadius: 14,
    alignItems: 'center',
  },
  rickHeadSvg: {
    ...StyleSheet.absoluteFillObject,
  },
  leftRickIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
  },
  rightRickIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
  },
});
