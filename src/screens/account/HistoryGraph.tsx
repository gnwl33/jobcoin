import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {Colors as c, Layout as l} from '../../styles';
import AppContext from '../../utils/AppContext';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: 'rgba(0,0,0,0)',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'rgba(0,0,0,0)',
  backgroundGradientToOpacity: 0,
  fillShadowGradient: c.blue,
  color: () => c.black,
  strokeWidth: 2,
  propsForDots: {
    r: '5',
  },
};

interface UserInfo {
  balance: string;
  transactions: {[key: string]: string}[];
}

export type HistoryGraphProps = {
  userInfo?: UserInfo;
};

const HistoryGraph = ({userInfo}: HistoryGraphProps) => {
  const {user} = useContext(AppContext);

  const userTransactions = userInfo?.transactions;
  let sum = 0;
  const transactionAmounts =
    userTransactions?.map(({amount, fromAddress, toAddress}) => {
      const amountNum = Number(amount);
      const balanceChange =
        fromAddress === user && toAddress !== user
          ? -amountNum
          : toAddress === user && fromAddress !== user
          ? amountNum
          : 0;
      return (sum += balanceChange);
    }) || [];
  const latestAmount = transactionAmounts?.slice(-1)[0];

  const transactionDates =
    userTransactions?.map(transaction =>
      moment(transaction.timestamp).format('MMM D, h:mmA'),
    ) || [];
  const latestDate = transactionDates?.slice(-1)[0];

  const data: LineChartData = {
    labels: [],
    datasets: [
      {
        data: transactionAmounts,
        color: () => c.blue,
        strokeWidth: 2,
      },
    ],
  };

  const [chartValue, setChartValue] = useState('');

  useEffect(() => {
    setChartValue(
      latestAmount && latestDate ? `${latestAmount} - ${latestDate}` : '',
    );
  }, [userTransactions, latestAmount, latestDate]);

  return (
    <View testID="lineChart" style={l.center}>
      <LineChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        formatYLabel={value => String(Math.round(Number(value)))}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={!!transactionAmounts.length}
        onDataPointClick={({value, index}) => {
          setChartValue(`${value} - ${transactionDates[index]}`);
        }}
        style={s.lineChart}
      />
      <View>
        <Text style={s.chartValue}>{chartValue}</Text>
      </View>
    </View>
  );
};

export default HistoryGraph;

const s = StyleSheet.create({
  lineChart: {
    marginTop: 20,
    marginBottom: -30,
    marginLeft: -7,
  },
  chartValue: {
    fontSize: 18,
  },
});
