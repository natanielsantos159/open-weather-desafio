import { createContext, useState } from 'react';

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [degree, setDegree] = useState('celsius');
  const values = {
    degree,
    setDegree,
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}