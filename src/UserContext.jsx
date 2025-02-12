import { createContext, useContext, useState, useEffect } from 'react';

// Create UserContext with default values
const UserContext = createContext({
  user: null,
  setUser: () => {},
  unsetUser: () => {},
});

export const useUserContext = () => useContext(UserContext); // Export the custom hook

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const unsetUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear stored user data
  };

  return (
    <UserContext.Provider value={{ user, setUser, unsetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
