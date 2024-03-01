import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import TodoListGroupScreen from '../screens/TodoListGroupScreen';
import TodoListScreen from '../screens/TodoListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import FlatListScreen from '../screens/FlatListScreen';
import SectionListScreen from '../screens/SectionListScreen';
import HomeScreen from '../screens/HomeScreen';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MainScreen">
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
