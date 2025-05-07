import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    // username: "default" || sessionStorage.getItem("username"),
    // password: "123" || sessionStorage.getItem("password"),
    // role: "USER" || sessionStorage.getItem("role"),
    // id: 3 || sessionStorage.getItem("id"),
    username: sessionStorage.getItem("username"),
    password: sessionStorage.getItem("password"),
    role: sessionStorage.getItem("role"),
    id: sessionStorage.getItem("id"),
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
