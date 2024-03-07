import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const fullName = useSelector((state) => state.customer.fullName);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>

      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;

///////////////////////
//install redux
// npm i redux

/////
// connect our Redux store
// with the React application.
//npm i react-redux

///////
//So in order to use this middleware,
// we need to follow three steps.
// First, we install the middleware package.
//
// Then we apply that middleware to our store.
//
// And finally, we use the middleware
// in our action creator functions.
//
// npm  i redux-thunk

//////
//redux dev tools
// 1 -intsall chrome extension
//https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
//
//2 - install npm
//npm i redux-devtools-extension
/////////
// Issue with installing redux-devtools-extention (solved)
// 48 upvotes
// Praveen · Lecture 272 · 7 months ago
// Issue with command
// 1 ) This command not go na work : npm i  redux-devtools-extention (This package has been deprecated)
// 2 )  Use this to solve the problem : npm i @redux-devtools/extension ;
//////
// import { composeWithDevTools } from '@redux-devtools/extension';
// const store = createStore(
//   reducer,
//   composeWithDevTools(
//     applyMiddleware(thunk)
//   )
// );

//////
// installing redux toolkit
//npm i @reduxjs/toolkit
