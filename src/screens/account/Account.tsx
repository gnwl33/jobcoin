import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import {Button as TextButton} from 'react-native-paper';
import HistoryGraph from './HistoryGraph';
import SendWidget from './SendWidget';
import {Layout as l} from '../../styles';
import useFetch from '../../utils/useFetch';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {userUpdated} from '../../features/user/userSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserInfo, RootStackParamList} from '../../utils/types';
import {baseURL} from '../../utils/constants';

export type AccountProps = NativeStackScreenProps<
  RootStackParamList,
  'Account'
>;

const Account = ({navigation}: AccountProps) => {
  const user = useAppSelector(state => state.user.value);
  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const {data, fetchData} = useFetch<UserInfo>(`${baseURL}/addresses/${user}`);

  const userInfo = data;

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={[s.container, l.row, l.aICenter, l.wide100]}>
            <Text style={s.greeting}>
              Hi, {user.length < 12 ? user : user.slice(0, 11) + '...'}
            </Text>
            <TextButton
              style={s.signOut}
              onPress={() => {
                dispatch(userUpdated(''));
                navigation.navigate('SignIn');
              }}
              mode="text">
              Sign out
            </TextButton>
          </View>
          <HistoryGraph userInfo={userInfo} />
          <SendWidget fetchData={fetchData} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Account;

const s = StyleSheet.create({
  ios: {
    paddingBottom: 70,
  },
  android: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  container: {
    marginTop: 30,
  },
  greeting: {
    marginLeft: 26,
    fontSize: 34,
  },
  signOut: {
    position: 'absolute',
    top: 5,
    right: 12,
  },
});
