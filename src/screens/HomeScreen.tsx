import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {ICharacter, getAllCharacters} from '../api/characters';
import greenCircle from '../assets/images/greenCircle.png';
import Indicator from '../components/Indicator';
import NoData from '../components/NoData';
import HomeHeader from '../components/homeHeader';
import {debounce} from '../util/debounce';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export type RootStackParamList = {
  [key: string]: {id: number} | undefined;
};

const windowWidth = Dimensions.get('window').width;
const imgWidth = (windowWidth - 90) / 2;
const cardWidth = (windowWidth - 50) / 2;

const HomeScreen = () => {
  const navigation = useNavigation();

  const keyExtractor = (item: ICharacter, index: number) => {
    return `${JSON.stringify(item)}-${index}`;
  };

  const handleNavigate = (id: number) => {
    navigation.navigate('MainStack', {
      screen: 'CharacterDetail',
      params: {
        id: id,
      },
    });
  };

  const handleStatusColor = (status: string) => {
    if (status === 'Dead' || status === 'unknown') {
      return '#fff';
    } else {
      return '#8CD790';
    }
  };

  const renderList = ({item}: {item: ICharacter}) => {
    return (
      <TouchableOpacity onPress={() => handleNavigate(item.id)}>
        <View style={[styles.renderListStyle, {width: cardWidth}]}>
          <FastImage source={{uri: item.image}} style={styles.cardImgStyle} />
          <Text style={styles.nameText} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.statusSpeciesWrapper}>
            <FastImage
              source={greenCircle}
              style={[
                styles.circleStyle,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  tintColor: handleStatusColor(item.status),
                },
              ]}
            />
            <Text style={styles.statusSpeciesText} numberOfLines={1}>
              {item.status} - {item.species}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const {
    data: characters,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['get-characters'],
    queryFn: () => getAllCharacters(searchTerm),
    staleTime: 5 * 60 * 1000,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [characterLists, setCharacterLists] = useState<ICharacter[]>([]);

  const handleInputChange = useCallback(
    (text: string) => {
      debounce(setSearchTerm(text), 2000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm],
  );

  const handleSearchBySearchTerm = () => {
    setCharacterLists([]);
    refetch();
  };

  const handleNoDataCancel = () => {
    refetch();
  };

  useEffect(() => {
    let clonedCharacter: ICharacter[] = [...characterLists];

    if (characters !== undefined) {
      characters.forEach(el => {
        clonedCharacter.push({
          id: el.id,
          name: el.name,
          status: el.status,
          species: el.species,
          image: el.image,
        });
      });
      setCharacterLists(clonedCharacter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <HomeHeader
          handleInputChange={handleInputChange}
          handleSearchBySearchTerm={handleSearchBySearchTerm}
          searchTerm={searchTerm}
        />

        {isError ? (
          <NoData
            handleRetry={handleSearchBySearchTerm}
            handleCancel={handleNoDataCancel}
          />
        ) : isLoading ? (
          <Indicator />
        ) : (
          <View style={styles.listContainer}>
            <Text style={styles.listHeader}>Characters</Text>
            <FlatList
              data={characterLists}
              renderItem={renderList}
              initialNumToRender={20}
              keyExtractor={(item, index) => keyExtractor(item, index)}
              contentContainerStyle={styles.contentStyle}
              numColumns={2}
              columnWrapperStyle={styles.columnGap}
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={6}
              windowSize={30}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listHeader: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 15,
    color: '#fff',
  },

  listSection: {
    flex: 1,
    marginTop: 20,
  },

  listStyle: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },

  flatListWrapper: {},
  columnGap: {
    gap: 10,
  },

  renderListStyle: {
    padding: 10,
    backgroundColor: '#1D1D1B',
    borderRadius: 12,
  },
  contentStyle: {
    gap: 20,
  },
  cardImgStyle: {
    flex: 1,
    width: imgWidth,
    height: imgWidth,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  nameText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  statusSpeciesWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  circleStyle: {
    width: 5,
    height: 5,
    marginRight: 5,
    resizeMode: 'center',
  },
  statusSpeciesText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
