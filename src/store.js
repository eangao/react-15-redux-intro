// So basically, configure store does a lot of things
// automatically for us
// so it automatically will combine our reducers,
// it will automatically add the Thunk middleware,
// and it will even automatically set up the developer tools,
// so basically this part right here,
// so all of this will happen automatically
// and then in the end, of course,
// our store is created and returned.
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
