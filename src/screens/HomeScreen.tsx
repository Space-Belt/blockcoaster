import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ICoin, getCoins, postCoin} from '../api/coin';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const [coinNameList, setCoinNameList] = useState<
    {name: string; id: number}[]
  >([]);

  const {
    data: coins,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['get-coins'],
    queryFn: getCoins,
    staleTime: 5 * 60 * 1000,
  });

  const {mutate: postCoinMutation} = useMutation({
    mutationKey: ['post-coin'],
    mutationFn: () => postCoin(1),
  });

  // React.useEffect(() => {
  //   if (coins !== undefined) {
  //     let clonedData: any[] = [];
  //     coins.forEach((el: any, index: number) => {
  //       clonedData.push({
  //         name: el.name,
  //         id: `id-${el.name}-${index}`,
  //       });
  //     });
  //     setCoinNameList(clonedData);
  //     console.log('ㅇㄹㅇㄹㅇㄹ');
  //     console.log(clonedData);
  //   }
  // }, [isLoading, isError, isSuccess, coins]);

  const handleSubmitSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ['get-coins'],
    });

    navigation.goBack();
  };

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

  if (isError) {
    return (
      <View>
        <Text>에러가 발생했습니다</Text>
        <TouchableOpacity
          onPress={() => {
            refetch();
          }}>
          <Text>다시 로드하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading && (
        <ActivityIndicator
          size={'large'}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#FFF',
          }}
        />
      )}
      {/* <Text>HomeScreen</Text> */}
      <FlatList
        data={coins}
        renderItem={renderList}
        keyExtractor={keyExtractor}
        style={styles.listStyle}
      />
      {/* <TouchableOpacity
        onPress={() => {
          postCoinMutation();
        }}>
        <Text>코인 수정하기</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
  },
});
