import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Logo, Input, Button} from '../../components';
import {Layout as l} from '../../styles';
import {selectUser} from '../../features/user/userSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';
import {userUpdated} from '../../features/user/userSlice';

export type SignInProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

const SignIn = ({navigation}: SignInProps) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[l.flex, l.center]}>
        <Logo />
        <View style={[s.content, l.wide80, l.between]}>
          <Input
            label="Address"
            value={user}
            handleChange={text => dispatch(userUpdated(text))}
          />
          <Button
            label="Sign In"
            onPress={() => navigation.navigate('Account')}
            disabled={!user}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const s = StyleSheet.create({
  content: {
    height: 150,
    marginTop: 20,
  },
});
