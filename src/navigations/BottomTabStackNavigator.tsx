import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import home from '../assets/images/home.png';
import location from '../assets/images/locations.png';
import episode from '../assets/images/episodes.png';
import setting from '../assets/images/setting.png';

const BottomTab = createBottomTabNavigator();

const tabBarList = [
  {
    icon: 'homeIcon',
    name: 'Home',
    component: 'HomeScreen',
  },
  {
    icon: 'location',
    name: 'Locations',
    component: '',
  },
  {
    icon: 'episode',
    name: 'Episodes',
    component: '',
  },
  {
    icon: 'setting',
    name: 'Settings',
    component: '',
  },
];

const BottomTabStackNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#C1C1C1',
          title: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={home}
                style={[
                  styles.bottomIcon,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    tintColor: focused ? '#000' : '#C1C1C1',
                  },
                ]}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="location"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Locations',
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#C1C1C1',
          title: 'Locations',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={location}
                style={[
                  styles.bottomIcon,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    tintColor: focused ? '#000' : '#C1C1C1',
                  },
                ]}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="episode"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Episodes',
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#C1C1C1',
          title: 'Episodes',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={episode}
                style={[
                  styles.bottomIcon,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    tintColor: focused ? '#000' : '#C1C1C1',
                  },
                ]}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="setting"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#C1C1C1',
          title: 'Settings',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={setting}
                style={[
                  styles.bottomIcon,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    tintColor: focused ? '#000' : '#C1C1C1',
                  },
                ]}
              />
            );
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
    resizeMode: 'center',
  },
});
