export interface UserInfo {
  balance: string;
  transactions: {[key: string]: string}[];
}

export type RootStackParamList = {
  SignIn: undefined;
  Account: undefined;
};
