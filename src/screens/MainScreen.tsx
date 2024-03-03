import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainStackNavigator from '../navigations/MainStackNavigator';
import BottomTabStackNavigator from '../navigations/BottomTabStackNavigator';

// 앱 네비게이션의 루트가 된다는 의미로 RootStack
const RootStack = createStackNavigator();

const MainScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="MainStack"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="BottomTab" component={BottomTabStackNavigator} />
      {/* <RootStack.Screen name="MainStack" component={MainStackNavigator} /> */}
    </RootStack.Navigator>
  );
};

export default MainScreen;
