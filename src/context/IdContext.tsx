import React, {createContext} from 'react';

export const IdContext = createContext({
  id: 999,
  setId: () => {},
});
