import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabStackNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{tabBarLabel: 'HOME', title: '홈'}}
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
});
