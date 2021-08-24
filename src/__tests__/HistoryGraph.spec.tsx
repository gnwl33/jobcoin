import 'react-native';
import React from 'react';
import Account from '../screens/account/Account';
import {render} from '@testing-library/react-native';
import AppContext from '../utils/AppContext';

describe('Account', () => {
  it('shows correct data on initial render', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          balance: '20.25',
          transactions: [
            {
              timestamp: '2014-04-22T13:10:01.210Z',
              toAddress: 'BobsAddress',
              amount: '50.35',
            },
            {
              timestamp: '2014-04-23T18:25:43.511Z',
              fromAddress: 'BobsAddress',
              toAddress: 'AlicesAddress',
              amount: '30.1',
            },
          ],
        }),
    });
    const wrapper = render(
      <AppContext.Provider value={{user: 'BobsAddress'}}>
        {/* @ts-ignore */}
        <Account />
      </AppContext.Provider>,
    );

    const lineChart = await wrapper.findByTestId('lineChart');
    expect(lineChart.props).toMatchSnapshot();
    expect(lineChart.props.children[0].props.data.datasets[0].data).toEqual([
      50.35, 20.25,
    ]);
  });

  //    it('updates after sending Jobcoins', () => {
  //    });

  //    it('updates after refreshing', () => {
  //    });
});
