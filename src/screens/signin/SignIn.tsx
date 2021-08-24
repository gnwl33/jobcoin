import React, {useEffect, useContext} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  // TouchableWithoutFeedback
} from 'react-native';
import {Logo, Input, Button} from '../../components';
import {Layout as l} from '../../styles';
import AppContext from '../../utils/AppContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';

export type SignInProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

const SignIn = ({navigation}: SignInProps) => {
  const {user, setUser} = useContext(AppContext);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUser('');
    });

    return unsubscribe;
  }, [navigation, setUser]);

  return (
    <SafeAreaView style={[l.flex, l.center]}>
      <Logo />
      <View style={[s.content, l.wide80, l.between]}>
        <Input label="Address" value={user} handleChange={setUser} />
        <Button
          label="Sign In"
          onPress={() => navigation.navigate('Account')}
          disabled={!user}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const s = StyleSheet.create({
  content: {
    height: 150,
    marginTop: 20,
  },
});
