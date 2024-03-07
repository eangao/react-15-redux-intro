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

    ///////////////////////////////////////////
    //     And also indeed, we see that we only get
    // the first value here, but not the second one.
    // And the reason for this is that by default,
    // these automatically created action creators
    // only accept one single argument.
    // And so that then becomes action.payload.

    // That's why earlier we also got this not a number here,
    // 'cause we were then trying to add this payload amount
    // to the loan, which didn't exist.
    // So the amount and the purpose were actually not received.

    // And so this is basically one of the limitations
    // of having this opinionated structure.
    // So if these action creators are automatically created,
    // then we cannot really configure them.
    // So we cannot easily make them receive two arguments.

    // However, luckily for us, there is a solution
    // for this that Redux Toolkit implemented for us.
    // So basically, what we have to do is to prepare
    // the data before it reaches the reducer.
    // And so what we have to do now here is to separate this.
    // So here, we now need a new object.
    // So let's open that there and then close that right here.
    // And then we need to call this function here,
    // just the reducer and then before that,
    // we need to prepare that data with a prepare method.

    // And so what we need to do here now is to return a new object
    // which will then become the payload object in the reducer.
    // So that's why this is called prepare.
    // So let me just write a code and then it will make sense.
    // So again, here we return a new payload basically.
    // And so this payload should become an object
    // with amount and purpose.
    // And so it is this object that we return from here,
    // which again, will then be the payload in the reducer.

    // And so this is what we need to do
    // if we want our creator to receive
    // more than just one argument.
    // Now, of course, we could also have configured it
    // in a way that we directly pass in that object.
    // Well, not here.
    // But here.
    // So again, we could have made it in a way
    // that we the data as an object right here, immediately.
    // And so then we would also have only one argument.
    // But if you do want these two arguments,
    // then this is the way to go.

    // And since I wanted to show you this,
    // we just did it this way and also this way,
    // we then didn't have to change anything
    // in our code right here.
    // So otherwise, then we would have to come back
    // to our React code and change that here.
    // And of course, these preparation can also include
    // some other steps.
    // So for example, later on in that other slice,
    // we will then also add the created add property
    // where we set the date.
    // So also what we did earlier in the action creator.
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      /////////
      // state.loan = 0;
      // state.loanPurpose = "";
      // state.balance -= state.loan;
      //////
      //       And then paying it works just the same way.
      // Or actually, it doesn't.
      // Let's see.
      // So now we get 3000.
      // And so after paying, ah, it should go back.
      // So what's wrong here?
      // Ah, and I can see the problem already.
      // So here, we run into one of the pitfalls that comes
      // with the fact that we are now mutating our state.
      // So it has advantages, but it also has its problems.
      // So notice, how here in the very beginning
      // we set alone to zero.
      // And so then, here in this next line of code,
      // this is already zero.
      // And so then we simply subtract zero from the balance
      // which will not change it.
      // And so this now needs to come first.
      // So we now need to pay attention to the order of the code.
      //
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

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
