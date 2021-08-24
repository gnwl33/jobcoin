import React, {useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
  Platform,
} from 'react-native';
import {Button as TextButton} from 'react-native-paper';
import HistoryGraph from './HistoryGraph';
import SendWidget from './SendWidget';
import {Layout as l} from '../../styles';
import AppContext from '../../utils/AppContext';
import useFetch from '../../utils/useFetch';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UserInfo, RootStackParamList} from '../../utils/types';

export type AccountProps = NativeStackScreenProps<
  RootStackParamList,
  'Account'
>;

const Account = ({navigation}: AccountProps) => {
  const {user} = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);

  const {data, fetchData} = useFetch<UserInfo>(
    `http://jobcoin.gemini.com/skyline-departed/api/addresses/${user}`,
  );

  const userInfo = data;
  const userBalance = userInfo?.balance;
  const balanceLength = userBalance?.length || 0;

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const viewPadding = Platform.OS === 'ios' ? s.ios : s.android;

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <KeyboardAvoidingView style={[l.center, viewPadding]} behavior="height">
          <View style={[s.container, l.row, l.aICenter, l.wide100]}>
            <Text style={s.greeting}>
              Hi, {user.length < 12 ? user : user.slice(0, 11) + '...'}
            </Text>
            <TextButton
              style={s.signOut}
              onPress={() => {
                // setUser('');
                navigation.navigate('SignIn');
              }}
              mode="text">
              Sign out
            </TextButton>
          </View>
          <>
            <Text style={s.balanceLabel}>Jobcoin Balance</Text>
            <Text testID="balance" style={s.balanceAmount}>
              {balanceLength < 11
                ? userBalance
                : userBalance?.slice(0, 10) + '...'}
            </Text>
          </>
          <HistoryGraph userInfo={userInfo} />
          <SendWidget fetchData={fetchData} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
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
  balanceLabel: {
    fontSize: 21,
    marginTop: 35,
  },
  balanceAmount: {
    fontSize: 50,
  },
});
