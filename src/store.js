import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

///////////////////////////////////////////////////////////
// where it is now time to also create a file for each feature,
// here in this folder, about Redux.
// So let's call this one an account slice.
// So a slice is basically a piece,
// so just a part of the total state.
// So the entire state lives in the store.
// And so here we then basically take one slice of that state.
// And so this one here is gonna be everything related
// to the account,
// and then we will also have one customer slice.

// And so now the idea is that in each slice,
// we co-locate as much as the Redux logic as possible
// in one file so that we don't have to jump around
// all the time between files,
// which is really annoying, trust me.
