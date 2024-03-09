import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Home from '../assets/svg/home.svg';
import Location from '../assets/svg/location.svg';
import Episode from '../assets/svg/episode.svg';
import Setting from '../assets/svg/setting.svg';
import LearnAnimationScreen from '../screens/LearnAnimationScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabStackNavigator = () => {
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
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#C1C1C1',
          title: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return <Home stroke={focused ? '#fff' : '#C1C1C1C1'} />;
          },
        }}
      />
      <BottomTab.Screen
        name="location"
        component={LearnAnimationScreen}
        options={{
          tabBarLabel: 'Locations',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#C1C1C1',
          title: 'Locations',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return <Location stroke={focused ? '#fff' : '#C1C1C1C1'} />;
          },
        }}
      />
      <BottomTab.Screen
        name="episode"
        component={LearnAnimationScreen}
        options={{
          tabBarLabel: 'Episodes',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#C1C1C1',
          title: 'Episodes',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return <Episode stroke={focused ? '#fff' : '#C1C1C1C1'} />;
          },
        }}
      />
      <BottomTab.Screen
        name="setting"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#C1C1C1',
          title: 'Settings',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return <Setting stroke={focused ? '#fff' : '#C1C1C1C1'} />;
          },
        }}
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
