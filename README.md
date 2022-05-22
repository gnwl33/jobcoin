# Jobcoin

## Requirements:
1. Create 2 screens
  - Sign in page (using any created address from the management tool)
  - Send page, sending to any address (any string of text)
2. Track the balance of a Jobcoin address
3. Ability to send Jobcoin to an address and track those transactions and the resulting balance
4. Display transaction history visually (chart, line graph etc)

## Setup:
Given that the environment is set up with React Native CLI ([docs](https://reactnative.dev/docs/environment-setup)):
1. Clone the repo (`git clone https://github.com/gnwl33/jobcoin.git`)
2. `cd jobcoin && yarn setup`
3. `yarn ios` or `yarn android`

Original: https://snack.expo.dev/@gnwl33/jobcoin

## Considerations:
Updated with:
- TypeScript
- Redux
- New chart (Reanimated)

Considered:
- Formik
- Styled Components
