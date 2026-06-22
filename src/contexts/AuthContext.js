import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user,
      signIn: (email) => {
        setUser({
          name: email.toLowerCase() === 'admin@admin.com' ? 'Guilherme Galante' : 'Cliente InfnetFood',
          email,
          avatar: require('../../foto_apresentacao.jpg'),
        });
      },
      signOut: () => setUser(null),
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
