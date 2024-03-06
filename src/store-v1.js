// redux in isolation

import { combineReducers, createStore } from "redux";
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

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createAt: "",
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
function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      //     And here we are again, destructuring, the current state
      // even though we are then overriding all the three
      // properties that are in there.
      // So the reason for that is again, that this way
      // we will not run into any problem if for example
      // later we add another property
      // like a status or something like that.
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createAt: action.payload.createAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

// Now we cannot simply pass that other reducer in here
// but instead what we need to do is to combine
// all the reducers that we have in order to create
// one so-called root reducer.
// Because this reducer that creates store he
// receives is always considered the root reducer.
// So right now, that's just this one.
// But again, usually what we always do is to combine
// all the reducers that we have.

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());

// // And then remember how I said
// // that the payout here will actually a bit more complicated.
// // So that's why we left this part here for later.
// // So now for the very first time as a payload,
// // we will actually pass in another object.
// // So we haven't done that before,
// // but of course this is perfectly fine because with this
// // we can then pass in basically multiple pieces of data.
// // So let's say that we want an amount of a thousand Euros
// // and then the purpose is to buy a car.

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

/////////////////

// now it's time to build our action creator functions.
// So basically, action creators are nothing more
// than simply functions, that return actions.
// So they are really not a Redux thing,
// and Redux would work perfectly fine without them,
// but they are a useful convention
// that Redux developers have used forever, basically.
// So Redux would work without action creators
// but since it's a convention, let's now create some.
// So basically we are going to create one action creator
// for each possible action.
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a cheap car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  //   And so now let's do customer slash and for the sake
  // of convention, let's actually name this event here.
  // Exactly the same thing as the action creator function.
  return {
    type: "customer/createCustomer",
    payload: {
      fullName: fullName,
      nationalID: nationalID,

      //       Now, we could also do this inside the reducer
      // so computing the current date
      // but that would actually be a side effect.
      // And so we shouldn't have side effects
      // in the reducer function.
      // And so let's do that here.
      // Now usually we should in fact keep as much
      // business logic as possible inside the reducer.
      // But again, since this is actually a side effect,
      // this does not belong in the reducer.
      // Okay, so here we simply return the current date
      // nicely formatted.
      // And that's actually it.
      createAt: new Date().toISOString,
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Angao", "4679835456"));
console.log(store.getState());

store.dispatch(deposit(250));
console.log(store.getState());

//////////////////////////////
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
