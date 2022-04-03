import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
loading:false
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  return (
    <AuthContext.Provider
      value={{
        loading:state.loading,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
