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
  const getTabOptions = (
    tab: 'Home' | 'Locations' | 'Episodes' | 'Settings',
  ) => {
    return {
      tabBarLabel: tab,
      title: tab,
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#C1C1C1',
    };
  };

  // const getIcons = (focused: boolean, tab: string) => {
  //   return (

  //   )
  // }

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
        options={Object.assign(
          {
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => {
              return <Home stroke={focused ? '#fff' : '#C1C1C1C1'} />;
            },
          },
          getTabOptions('Home'),
        )}
      />
      <BottomTab.Screen
        name="location"
        component={HomeScreen}
        options={Object.assign(
          {
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => {
              return <Location stroke={focused ? '#fff' : '#C1C1C1C1'} />;
            },
          },
          getTabOptions('Home'),
        )}
      />
      <BottomTab.Screen
        name="episode"
        component={HomeScreen}
        options={Object.assign(
          {
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => {
              return <Episode stroke={focused ? '#fff' : '#C1C1C1C1'} />;
            },
          },
          getTabOptions('Home'),
        )}
      />
      <BottomTab.Screen
        name="setting"
        component={HomeScreen}
        options={Object.assign(
          {
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => {
              return <Setting stroke={focused ? '#fff' : '#C1C1C1C1'} />;
            },
          },
          getTabOptions('Home'),
        )}
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
