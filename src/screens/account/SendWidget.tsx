import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {Button, Input} from '../../components';
import {Layout as l} from '../../styles';
import {useAppSelector} from '../../app/hooks';
import {baseURL} from '../../utils/constants';

export type SendWidgetProps = {
  fetchData: () => Promise<void>;
};

const SendWidget = ({fetchData}: SendWidgetProps) => {
  const user = useAppSelector(state => state.user.value);

  const [toAddress, setToAddress] = useState('');
  const [amountToSend, setAmountToSend] = useState('');

  return (
    <View style={[l.aICenter, l.wide100]}>
      <View style={[s.container, l.wide80, l.between]}>
        <Input
          label="To Address"
          value={toAddress}
          handleChange={setToAddress}
        />
        <Input
          label="Amount"
          value={amountToSend}
          handleChange={setAmountToSend}
        />
        <Button
          label="Send Jobcoins"
          style={s.button}
          disabled={!toAddress || !amountToSend}
          onPress={async () => {
            const response = await fetch(
              `${baseURL}/transactions?fromAddress=${user}&toAddress=${toAddress}&amount=${amountToSend}`,
              {method: 'POST'},
            );
            const status = response.status;
            if (status === 200) {
              Toast.show({
                type: 'success',
                text1: 'Success!',
                text2: `You sent ${amountToSend} coins to ${toAddress}`,
                position: 'bottom',
              });
              fetchData();
              setToAddress('');
              setAmountToSend('');
            } else {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'This transaction could not occur',
                position: 'bottom',
              });
            }
          }}
        />
      </View>
    </View>
  );
};

export default SendWidget;

const s = StyleSheet.create({
  container: {
    marginTop: 50,
    height: 225,
  },
  button: {
    marginTop: 7,
  },
});
