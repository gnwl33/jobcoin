import React from 'react';
import {View, Text, StyleSheet, Image, ViewStyle} from 'react-native';
import {Layout as l, Typography as t} from '../styles';

export type LogoProps = {
  style?: ViewStyle;
};

const Logo = ({style}: LogoProps) => {
  return (
    <View style={[l.center, l.row, style]}>
      <Image source={require('../assets/logo.png')} style={s.logoImage} />
      <Text style={t.heading1}>Jobcoin</Text>
    </View>
  );
};

export default Logo;

const s = StyleSheet.create({
  logoImage: {
    resizeMode: 'contain',
    width: 47,
    marginRight: 8,
  },
});
