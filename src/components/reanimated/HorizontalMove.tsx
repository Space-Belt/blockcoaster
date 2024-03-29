import React from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Morty from '../../assets/svg/mortie.svg';

const ICON_WIDTH: number = 71;

const HorizontalMove = () => {
  const position = useSharedValue<number>(0);
  const [switchStatus, setSwitchStatus] = React.useState(false);

  const handleSwitch = () => {
    setSwitchStatus(prev => !prev);
  };

  const moveAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: `${position.value}%`,
      transform: [{translateX: (-ICON_WIDTH * position.value) / 100}],
    };
  });

  React.useEffect(() => {
    position.value = withSpring(switchStatus ? 100 : 0, {
      duration: 5000,
    });
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

export default HorizontalMove;

const styles = StyleSheet.create({
  wrapper: {gap: 20},
  countMoveBox: {
    flexDirection: 'row',
    gap: 5,
  },
  rickBox: {
    flexDirection: 'row',
    height: 80,
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
  },
  rickIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
