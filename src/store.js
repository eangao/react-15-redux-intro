// redux in isolation

import { createStore } from "redux";
// And so now you see that it has like,
// this strike through here.
// And the reason for that is
// that the Redux team kind of declared
// that this method is deprecated.
// So as I mentioned earlier, there is now a more
// modern way of writing Redux, which is Redux Toolkit.
// However, I still believe that it is really way
// better to first learn Redux in this way.
// So in the way that I'm showing you now.
// And then once you have all the Redux knowledge,
// to then transition into Redux Toolkit.
// Because otherwise everything will
// really just seem like magic.
// It works just too easily,
// and then you have no idea what is going on.
// So you should not be using the Redux core package
// by itself except for learning purposes.

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Now, it's also important to remember
// that reducers are not allowed to modify the existing state
// and they're also not allowed to do any asynchronous logic
// or other side effects.
// So instead, what we should do with reducers
// is to place as much logic as possible inside of them

// But anyway, one thing that is actually different
// between this reducer and the reducer in the useReducer hook
// is that usually we directly pass in the initialState
// as the default state.
// So using here this default parameter in JavaScript.
// So this is just a normal JavaScript feature
// where you can specify a default parameter
// in case there is none set.
// So with this, we make this initialState here
// really the state at the very beginning.
function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      //LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

// And then remember how I said
// that the payout here will actually a bit more complicated.
// So that's why we left this part here for later.
// So now for the very first time as a payload,
// we will actually pass in another object.
// So we haven't done that before,
// but of course this is perfectly fine because with this
// we can then pass in basically multiple pieces of data.
// So let's say that we want an amount of a thousand Euros
// and then the purpose is to buy a car.
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buy a car" },
});
console.log(store.getState());

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
