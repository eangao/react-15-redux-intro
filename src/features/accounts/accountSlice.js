// Now remember how we had already organized all our code here
// into this concept of slices.
// So we have the initial state, we have the reducer
// and we also have the action creators
// down there in this file.
// And so now with Redux Toolkit, this idea of slices actually
// really got baked into Redux itself.

import { createSlice } from "@reduxjs/toolkit";
// So we now have this function called createSlice
// which we can import from Redux Toolkit.
// So let's do that.
// So import, createSlice, just like this.
// And so this create slice function here gives us
// three big benefits.

// First of all, it'll automatically create action creators
// from our reducers.

// Second, it makes writing these reducers a lot easier
// because we no longer need that switch statement
// and also the default case is automatically handled.

// And third, we can actually mutate now,
// our state inside reducers.
// So just as we have learned about previously
// when we first talked about Redux Toolkit.

// Now remember how behind the scenes this will then use
// a library called Immer which will actually convert our logic
// back to immutable logic.
// So behind the scenes, Redux still requires
// this kind of logic right here
// where we do not mute data state,
// but we will now be able to convert this kind of logic here
// to a mutating logic.
// And from my experience, this last point is actually
// the biggest advantage of using Redux Toolkit over
// what we have been doing before.
// About these other points, I believe that React Toolkit
// actually forces us into a pattern that's a bit too
// opinionated in my opinion, but well,
// that's just the recommended way of using
// and learning Redux right now.
////////////////

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    //     So the only difference is that here,
    // we do no longer return the entire state now,
    // and also we don't write it like this.
    // So we don't create a new object where we then
    // set the balanced property.
    // Instead, we basically mutate the balanced property
    // that lives on the state.
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      //       Now, in this case, not doing anything
      // is not returning the state
      // but instead simply returning from this function.
      // So we will not return anything, because remember,
      // in these new reducers, we no longer need to return
      // the entire state.
      // So we just modify what we want.
      // And so in this case, we don't want to modify anything.
      // So this is indeed a huge shift.
      // And if you were already used to writing it this way,
      // because you practice the use reducer hook,
      // then this is gonna be an even bigger shift.
      // But for total beginners, I believe that this
      // is actually a lot easier.
      // And this will become even more apparent
      // When we have, like, nested objects and arrays.
      if (state.loan > 0) return;

      //       So here it is actually an equal
      // because remember, we are now assigning.
      // So we are really overriding.
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance += action.payload.amount;
    },
    payLoan(state, action) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance -= state.loan;
    },
  },
});

console.log(accountSlice);

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

console.log(requestLoan(200, "test"));

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };

//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       //LATER
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };

//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }

// // name export
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   //   So again, if we return a function here,
//   // then Redux knows that this is the asynchronous action
//   // that we want to execute before dispatching anything
//   // to the store.
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });

//     // API call
//     // https://www.frankfurter.app/

//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );

//     const data = await res.json();
//     const converted = data.rates.USD;

//     // dispatch action
//     dispatch({ type: "account/deposit", payload: converted });
//     //     of the action to the future.
//     // So basically to the point after this fetch request here
//     // has successfully retrieved the data.
//     // So only after all of this is done, we actually dispatch.

//     //     And so now, in the end,
//     // do you think that in the end,
//     // we should then here dispatch another action,
//     // so one to basically set isLoading back to false?
//     // Well, we don't have to
//     // because that's the beauty of updating multiple states
//     // at the same time with the reducer.
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
