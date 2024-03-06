const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//default export
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

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
    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

// name export
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //   So again, if we return a function here,
  // then Redux knows that this is the asynchronous action
  // that we want to execute before dispatching anything
  // to the store.
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    // API call
    // https://www.frankfurter.app/

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD;

    // dispatch action
    dispatch({ type: "account/deposit", payload: converted });
    //     of the action to the future.
    // So basically to the point after this fetch request here
    // has successfully retrieved the data.
    // So only after all of this is done, we actually dispatch.

    //     And so now, in the end,
    // do you think that in the end,
    // we should then here dispatch another action,
    // so one to basically set isLoading back to false?
    // Well, we don't have to
    // because that's the beauty of updating multiple states
    // at the same time with the reducer.
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
