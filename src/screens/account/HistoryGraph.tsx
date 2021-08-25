import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment';
import {Colors as c, Layout as l} from '../../styles';
import {useAppSelector} from '../../app/hooks';
import {
  ChartDot,
  ChartPath,
  ChartYLabel,
  ChartXLabel,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import 'react-native-reanimated';

const width = Dimensions.get('window').width;

interface UserInfo {
  balance: string;
  transactions: {[key: string]: string}[];
}

export type HistoryGraphProps = {
  userInfo?: UserInfo;
};

const HistoryGraph = ({userInfo}: HistoryGraphProps) => {
  const user = useAppSelector(state => state.user.value);
  const userBalance = userInfo?.balance;
  const userTransactions = userInfo?.transactions;
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;
  const mappedTransactions =
    userTransactions?.map(({amount, fromAddress, toAddress, timestamp}) => {
      const amountNum = Number(amount);
      const balanceChange =
        fromAddress === user && toAddress !== user
          ? -amountNum
          : toAddress === user && fromAddress !== user
          ? amountNum
          : 0;
      sum += balanceChange;
      min = Math.min(sum, min);
      max = Math.max(sum, max);

      const formattedTime = moment(timestamp).format('MMM D, h:mmA');
      return {amount: sum, timestamp: formattedTime};
    }) || [];

  const chartData: {x: number; y: number}[] = [];
  const dataLength = mappedTransactions.length;
  const chartDates: string[] = [];
  console.log(mappedTransactions);

  mappedTransactions?.forEach((transaction, index) => {
    const {amount, timestamp} = transaction;
    if (dataLength < 20) {
      for (let i = 0; i < 20 / dataLength; i++) {
        chartData.push({
          x: chartData.length,
          y: amount,
        });
        chartDates.push(timestamp);
      }
    } else {
      chartData.push({
        x: index,
        y: amount,
      });
      chartDates.push(timestamp);
    }
  });

  const latestDate = chartDates?.slice(-1)[0];

  const points = monotoneCubicInterpolation({
    data: chartData,
    range: chartData.length,
  });

  const formatBalance = (balance: string) => {
    'worklet';
    if (balance.includes('.99999') || balance.includes('.00000')) {
      return String(Math.round(Number(balance)));
    }
    return (
      (balance.length < 11 ? balance : balance?.slice(0, 10) + '...') ||
      userBalance
    );
  };

  const getDate = (index: number) => {
    'worklet';
    return chartDates[index] || latestDate;
  };

  return (
    <View testID="lineChart" style={l.aICenter}>
      <Text style={s.balanceLabel}>Jobcoin Balance</Text>
      {!!chartData.length && (
        <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
          <ChartYLabel format={formatBalance} style={s.balanceAmount} />
          <ChartXLabel format={getDate} style={s.date} />
          <View style={l.row}>
            <ChartPath
              height={(width * 0.9) / 2}
              width={width * 0.82}
              stroke={c.blue}
              strokeWidth={3}
              selectedStrokeWidth={3}
            />
            <ChartDot size={15} style={{backgroundColor: c.blue}} />
            <View style={[l.aICenter, l.between]}>{getYLabels(min, max)}</View>
          </View>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default HistoryGraph;

const getYLabels = (min: number, max: number) => {
  const factors = [4, 3, 2, 1, 0];
  return factors.map(factor => (
    <Text key={factor}>{Math.round(min + ((max - min) * factor) / 4)}</Text>
  ));
};

const s = StyleSheet.create({
  balanceLabel: {
    fontSize: 21,
    marginTop: 35,
  },
  balanceAmount: {
    fontSize: 50,
  },
  date: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 20,
  },
});
