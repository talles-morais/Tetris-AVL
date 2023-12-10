import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Lógica de autenticação aqui...
    // Por exemplo, você pode fazer uma chamada de API para verificar as credenciais.

    // Se a autenticação for bem-sucedida, defina o usuário no estado.
    setUser(userData);
  };

  const logout = () => {
    // Lógica de logout aqui...
    // Por exemplo, limpar o token de autenticação.

    // Limpe o estado do usuário.
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
