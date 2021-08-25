import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Colors as c, Layout as l} from '../styles';

export type InputProps = {
  label: string;
  value: string;
  handleChange: (text: string) => void;
  style?: ViewStyle;
};

const Input = ({label, value, handleChange, style}: InputProps) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={handleChange}
      style={[s.input, l.wide100, style]}
      selectionColor={c.blue}
      mode="outlined"
    />
  );
};

export default Input;

const s = StyleSheet.create({
  input: {
    height: 60,
    fontSize: 20,
  },
});
