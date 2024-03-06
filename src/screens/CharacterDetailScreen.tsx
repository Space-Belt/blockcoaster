import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ParamListBase,
  Route,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  ICharacter,
  ICharacterDetail,
  getCharacterById,
} from '../api/characters';

import backIcon from '../assets/images/back.png';
import greenCircle from '../assets/images/greenCircle.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const windowWidths = Dimensions.get('window').width;

const tempId = {id: 0};

// RouteProp<ParamListBase>'
//   'Omit<NavigationHelpersCommon<RoutProps, StackNavigationState<RoutProps>>,

const CharacterDetailScreen = () => {
  // const route = useRoute<RouteProp<ParamListBase>>();
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params;
  const {id} = params ?? tempId;

  // const {id} = params ?? tempId;

  const [characterData, setCharacterData] = useState<ICharacterDetail>();

  useEffect(() => {
    if (route.params !== undefined) {
      console.log('ㅇㅇ');
      console.log(route);
    }
    const getData = async (characterId: number) => {
      let results = await getCharacterById(characterId);

      let temp: ICharacterDetail = {
        id: results?.id,
        name: results?.name,
        status: results?.status,
        species: results?.species,
        gender: results?.gender,
        image: results?.image,
        location: results?.location,
      };

      setCharacterData(temp);
    };
    if (id !== 0) {
      getData(id);
    }

    console.log(windowWidths);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        source={{uri: characterData?.image}}
        resizeMode={'cover'}
        style={styles.imageWrapper}
        imageStyle={styles.bigImg}>
        <View style={styles.backWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.overlayView} />
      </ImageBackground>
      <View style={styles.textWrapper}>
        <Text style={styles.nameText}>{characterData?.name}</Text>
        <View style={styles.statusWraper}>
          <Image source={greenCircle} style={styles.statusColor} />
          <Text style={styles.statusSpeciesText}>
            {characterData?.status} - {characterData?.species}
          </Text>
        </View>
        <Text style={styles.genderText}>Gender: {characterData?.gender}</Text>
        <Text style={styles.locationText}>
          Location: {characterData?.location.name}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CharacterDetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  imageWrapper: {
    width: windowWidths,
    height: windowWidths,
  },
  bigImg: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backWrapper: {
    zIndex: 100,
    top: 20,
    left: 15,
    width: 30,
    height: 30,
  },
  backIcon: {
    zIndex: 100,
    width: 30,
    height: 30,
  },
  overlayView: {
    zIndex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.31)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
  },
  statusWraper: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusColor: {
    width: 5,
    height: 5,
    resizeMode: 'center',
  },
  statusSpeciesText: {
    fontSize: 12,
    fontWeight: '700',
  },
  genderText: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '700',
  },
  locationText: {
    marginTop: 7,
    fontSize: 14,
    fontWeight: '700',
  },
});
