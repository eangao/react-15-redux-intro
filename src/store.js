// redux in isolation

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
  switch (action.payload) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance + action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //LATER
      return { ...state, loan: action.payload };
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
