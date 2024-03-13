import React from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Morty from '../../assets/svg/mortie.svg';

const VerticalMove = () => {
  const position = useSharedValue<number>(0);
  const [switchStatus, setSwitchStatus] = React.useState(false);

  const handleSwitch = () => {
    setSwitchStatus(prev => !prev);
  };

  const moveAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: `${position.value}%`,
      transform: [
        {translateX: -71 / 2},
        {translateY: (-71 * position.value) / 100},
      ],
    };
  });

  React.useEffect(() => {
    position.value = withDelay(500, withSpring(switchStatus ? 100 : 0));
  }, [switchStatus]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.countMoveBox}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={switchStatus ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleSwitch}
          value={switchStatus}
        />
      </View>
      <View style={styles.rickBox}>
        <Animated.View style={[styles.rickIconContainer, moveAnimatedStyle]}>
          <Morty />
        </Animated.View>
      </View>
    </View>
  );
};

export default VerticalMove;

const styles = StyleSheet.create({
  wrapper: {gap: 20},
  countMoveBox: {
    flexDirection: 'row',
    gap: 5,
  },
  rickBox: {
    flexDirection: 'row',
    height: 335,
    width: 80,
    borderWidth: 2,
    borderColor: '#EAEAEA',
    borderRadius: 14,
    alignItems: 'center',
  },
  rickIconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 71,
    height: 71,
    left: '50%',
  },
  rickIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
