export function combineReducer(reducers) {
  const globalState = {};

  // set default state returned by reducer and its reducer
  for (const [key, value] of Object.entries(reducers)) {
    if (typeof value === "function") {
      globalState[key] = value(undefined, { type: "__@@PLACEHOLDER_ACTION__" });
    } else {
      console.error(`${value} is not a function`);
    }
  }

  const reducerFunction = (state, action) => {
    let hasStateChanged = false;
    const updatedStateByReducers = {};

    for (const reducer in reducers) {
      if (reducers.hasOwnProperty(reducer)) {
        const currentStateByKey = state[reducer];
        const currentReducer = reducers[reducer];

        const returnedStateByReducer = currentReducer(
          currentStateByKey,
          action
        );

        const areStateByKeyEqual = returnedStateByReducer !== currentStateByKey;

        hasStateChanged = hasStateChanged || areStateByKeyEqual;

        updatedStateByReducers[reducer] = returnedStateByReducer;
      }
    }
    return hasStateChanged ? updatedStateByReducers : state;
  };

  // return the initial state and the global reducer
  return [globalState, reducerFunction];
}
