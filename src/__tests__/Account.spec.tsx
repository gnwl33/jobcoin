import React from 'react';
import Account from '../screens/account/Account';
import {render} from '@testing-library/react-native';

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
    // @ts-ignore
    const wrapper = render(<Account />);

    const lineChart = await wrapper.findByTestId('lineChart');
    expect(lineChart.props).toMatchSnapshot();
  });

  //    it('updates after sending Jobcoins', () => {
  //    });

  //    it('updates after refreshing', () => {
  //    });
});
