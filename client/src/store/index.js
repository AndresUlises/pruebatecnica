import React, { createContext, useReducer, useMemo } from "react";
import { combineReducer } from "../helpers/combineReducer";

import { reducer } from "./reducer";

export const AppStateProvider = createContext();

function ContextProvider({ children }) {
  const reducers = React.useCallback(() => {
    return combineReducer(reducer);
  }, []);

  // call the function to get initial state and global reducer
  const [initialState, mainReducer] = reducers();

  // setup useReducer with the returned value of the reducers function
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppStateProvider.Provider value={contextValue}>
      {children}
    </AppStateProvider.Provider>
  );
}

export { ContextProvider, AppStateProvider as ContextConsumer };
