import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Indicator = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator animating={true} color={'#000'} size={'small'} />
      <Text style={styles.loadingText}>로딩중입니다.</Text>
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
