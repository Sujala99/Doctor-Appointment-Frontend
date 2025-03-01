import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';
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
      setUser(JSON.parse(storedUser)); // Load user from localStorage if available
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage when it changes
    } else {
      localStorage.removeItem('user'); // Remove user from localStorage if no user
    }
  }, [user]);

  const unsetUser = () => {
    setUser(null); // Clear the user from the state
    localStorage.removeItem('user'); // Clear the user from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, unsetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
