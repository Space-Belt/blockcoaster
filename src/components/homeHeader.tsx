import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import mortie from '../assets/images/mortie.png';
import search from '../assets/images/search.png';

type Props = {
  handleInputChange: (...args: any[]) => void;
  searchTerm: string;
};

const HomeHeader = (props: Props) => {
  return (
    <View style={styles.headerWrapper}>
      <Image source={mortie} style={styles.imgWrapper} />
      <View style={styles.inputWrapper}>
        <TextInput
          value={props.searchTerm}
          onChangeText={props.handleInputChange}
          style={styles.textInput}
          placeholder="Please enter a searchTerm"
        />
        <Image source={search} style={styles.searchIcon} />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
  },
  imgWrapper: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
});
