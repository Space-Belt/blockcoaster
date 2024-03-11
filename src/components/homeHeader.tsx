import {Image, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import mortie from '../assets/images/mortie.png';
import search from '../assets/images/search.png';
import SearchIcon from '../assets/svg/searchIcon.svg';

import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  handleInputChange: (...args: any[]) => void;
  handleSearchBySearchTerm: () => void;
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
          placeholderTextColor={'#CCCCCC'}
          placeholder="Please enter a searchTerm"
        />
        <TouchableOpacity onPress={props.handleSearchBySearchTerm}>
          <SearchIcon stroke={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingTop: 10,
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
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
