import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {Layout as l} from '../styles';

export type ButtonProps = {
  label: string;
  style?: ViewStyle;
  onPress: () => void;
  disabled: boolean;
};

const Button = ({label, style, onPress, disabled}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      disabled={disabled}>
      <PaperButton
        style={[s.button, l.center, l.wide100, style]}
        labelStyle={s.label}
        disabled={disabled}
        uppercase={false}
        mode="contained">
        {label}
      </PaperButton>
    </TouchableOpacity>
  );
};

export default Button;

export const s = StyleSheet.create({
  button: {
    height: 65,
  },
  label: {
    fontSize: 20,
  },
});
