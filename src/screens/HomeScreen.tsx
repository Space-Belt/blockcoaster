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

export type RootStackParamList = {
  [key: string]: {id: number} | undefined;
};

const windowWidth = Dimensions.get('window').width;
const imgWidth = (windowWidth - 90) / 2;
const cardWidth = (windowWidth - 50) / 2;
const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [maxPage, setMaxPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);

  const keyExtractor = (item: ICharacter, index: number) => {
    return `${JSON.stringify(item)}-${index}`;
  };

  const renderList = ({item}: {item: ICharacter}) => {
    let tempStyle = {
      tintColor:
        item.status === 'Dead' || item.status === 'unknown'
          ? '#fff'
          : '#8CD790',
    };

    let tempWidth = {
      width: cardWidth,
    };

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainStack', {
            id: item.id,
          });
        }}>
        <View style={[styles.renderListStyle, tempWidth]}>
          <Image source={{uri: item.image}} style={styles.cardImgStyle} />
          <Text style={styles.nameText}>
            {item.name.slice(0, 15)}
            {item.name.length > 13 ? '...' : ''}
          </Text>
          <View style={styles.statusSpeciesWrapper}>
            <Image
              source={greenCircle}
              style={[styles.circleStyle, tempStyle]}
            />
            <Text style={styles.statusSpeciesText}>
              {item.status} - {item.species.slice(0, 12)}
              {item.species.length > 13 ? '...' : ''}
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
    queryFn: () => getAllCharacters(firstPage, searchTerm),
    staleTime: 5 * 60 * 1000,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [characterLists, setCharacterLists] = useState<ICharacter[]>([]);

  const [onLoading, setOnLoading] = useState<boolean>(false);
  const [onError, setOnError] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (text: string) => {
      debounce(setSearchTerm(text), 2000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm],
  );

  const handleSearchBySearchTerm = () => {
    setFirstPage(1);
    setMaxPage(1);

    setCharacterLists([]);

    setOnError(false);

    refetch();
  };

  const handleNoDataCancel = () => {
    setOnError(false);
    refetch();
  };

  const onEndReached = useCallback(() => {
    setFirstPage(prev => {
      if (prev < maxPage) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  }, [maxPage]);

  useEffect(() => {
    console.log('돕니다요');
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPage]);

  useEffect(() => {
    let clonedCharacter: ICharacter[] = [...characterLists];
    console.log('캐릭터들이 들어왔습니다.');
    if (characters !== undefined) {
      let tempMaxPage = characters.info.pages;
      characters.results.forEach(el => {
        clonedCharacter.push({
          id: el.id,
          name: el.name,
          status: el.status,
          species: el.species,
          image: el.image,
        });
      });
      setCharacterLists(clonedCharacter);
      setMaxPage(tempMaxPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters]);

  useEffect(() => {
    if (isError) {
      setOnError(true);
      setSearchTerm('');
    }

    if (isLoading) {
      setOnError(false);
      setOnLoading(true);
    }

    if (isSuccess) {
      setOnError(false);
      setOnLoading(false);
      setSearchTerm('');
    }
    console.log('돌쥬?');
    console.log(isError);
    console.log(isLoading);
    console.log(isSuccess);
  }, [isError, isLoading, isSuccess]);

  // if (isLoading) {
  //   return <Indicator />;
  // }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <HomeHeader
          handleInputChange={handleInputChange}
          handleSearchBySearchTerm={handleSearchBySearchTerm}
          searchTerm={searchTerm}
        />

        {onError ? (
          isLoading ? (
            <NoData
              handleRetry={handleSearchBySearchTerm}
              handleCancel={handleNoDataCancel}
            />
          ) : (
            <Indicator />
          )
        ) : (
          <View style={styles.listContainer}>
            <Text style={styles.listHeader}>Characters</Text>

            <FlatList
              data={characterLists}
              renderItem={renderList}
              keyExtractor={(item, index) => keyExtractor(item, index)}
              contentContainerStyle={styles.contentStyle}
              numColumns={2}
              columnWrapperStyle={styles.columnGap}
              onEndReachedThreshold={1}
              onEndReached={onEndReached}
              ListFooterComponent={isLoading ? <Indicator /> : <></>}
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
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },

  flatListWrapper: {
    // flex: 1,
  },
  columnGap: {
    gap: 10,
  },

  renderListStyle: {
    // flex: 1,
    // width: '50%',
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
