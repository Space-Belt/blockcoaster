import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ICoin, getCoins, postCoin} from '../api/coin';
import {useNavigation} from '@react-navigation/native';
import HomeHeader from '../components/homeHeader';

const keyExtractor = (item: ICoin) => {
  return item.id;
};
const renderList = ({item}: {item: ICoin}) => {
  return (
    <View style={{flex: 1, height: 20}}>
      <Text style={{color: '#000'}}>{item.name}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInputChange = useCallback((text: string) => {
    setSearchTerm(text);
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <HomeHeader
          handleInputChange={handleInputChange}
          searchTerm={searchTerm}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  listStyle: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
});
