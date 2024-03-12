import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Home from '../assets/svg/home.svg';
import Location from '../assets/svg/location.svg';
import Episode from '../assets/svg/episode.svg';
import Setting from '../assets/svg/setting.svg';
import LearnAnimationScreen from '../screens/LearnAnimationScreen';
import {ParamListBase, RouteProp} from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

const BottomTabStackNavigator = () => {
  const getTabOption = (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }) => {
    const {route} = props;
    const {name} = route;

    const getTabBarIcon = (name: string, focused: boolean) => {
      switch (name) {
        case 'Home':
          return <Home stroke={focused ? '#fff' : '#C1C1C1C1'} />;
        case 'Locations':
          return <Location stroke={focused ? '#fff' : '#C1C1C1C1'} />;
        case 'Episodes':
          return <Episode stroke={focused ? '#fff' : '#C1C1C1C1'} />;
        case 'Settings':
          return <Setting stroke={focused ? '#fff' : '#C1C1C1C1'} />;
        default:
          return null;
      }
    };

    return {
      tabBarIcon: ({focused}: {focused: boolean}) =>
        getTabBarIcon(name, focused),
      tabBarLabel: name,
      title: name,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#C1C1C1',
    };
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 55,
          paddingBottom: 5,
          backgroundColor: '#141414',
          borderTopColor: '#141414',
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={getTabOption}
      />
      <BottomTab.Screen
        name="Locations"
        component={HomeScreen}
        options={getTabOption}
      />
      <BottomTab.Screen
        name="Episodes"
        component={HomeScreen}
        options={getTabOption}
      />
      <BottomTab.Screen
        name="Settings"
        component={HomeScreen}
        options={getTabOption}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStackNavigator;

const styles = StyleSheet.create({
  navigation: {
    flex: 1,
    backgroundColor: 'red',
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    color: '#000',
  },
  bottomIcon: {
    width: 25,
    height: 25,

    paddingTop: 10,
    resizeMode: 'center',
  },
});
