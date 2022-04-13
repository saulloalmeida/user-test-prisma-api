import { createContext } from "react";

export const UserContext = createContext<String>("");

const UserProvider: React.FC = ({ children }) => {
  return <UserContext.Provider value="data">{children}</UserContext.Provider>;
};
export default UserProvider;
