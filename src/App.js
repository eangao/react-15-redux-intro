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
