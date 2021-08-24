import React from 'react';

export type ContextType = {
  user: string;
  setUser?: React.Dispatch<React.SetStateAction<string>>;
};

export default React.createContext<ContextType>({
  user: '',
  setUser: () => {},
});
