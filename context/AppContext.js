import { createContext, useState } from 'react';

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [degree, setDegree] = useState('celsius');
  const [lang, setLang] = useState('pt-BR');

  const values = {
    degree,
    setDegree,
    lang,
    setLang
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}