/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import MainScreen from './screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({});

export default App;
