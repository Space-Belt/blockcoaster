import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import lick from '../assets/images/lick.png';

type Props = {
  handleRetry: () => void;
  handleCancel: () => void;
};

const NoData = (props: Props) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.noData}>
        <Image source={lick} style={styles.noDataImg} />
        <Text>찾으시는 데이터가 존재하지 않습니다.</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={props.handleRetry}>
            <Text style={styles.leftbutton}>다시시도</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.handleCancel}>
            <Text style={styles.rightButton}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoData;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  noData: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataImg: {
    width: 50,
    height: 50,
    resizeMode: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  leftbutton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
