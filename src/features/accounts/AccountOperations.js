import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
    isLoading,
  } = useSelector((store) => store.account);

  console.log(balance);

  function handleDeposit() {
    if (!depositAmount) return;

    // dispatch(deposit(depositAmount, currency));
    dispatch(deposit(depositAmount));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;

    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;

    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 ? (
          <div>
            <span>
              Pay back ${currentLoan} ({currentLoanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AccountOperations;

///////////////////
// Now, the beauty of what we just implemented here is
// that this component here actually has no idea
// that the amount is converted behind the scenes.
// So that conversion is completely hidden from our component.
// And instead, it is encapsulated right here
// in the account slice.
// So it's happening here in the centralized place.
// And if we had other API calls
// or other asynchronous operations
// in these other action creators,
// then, of course, they would also be in this file.
// So again, they would then all be
// in this one centralized place,
// not spread all over the application.
// And so with this,
// we can keep this component here really tidy and clean.
// I mean, it's not really that clean
// because we chose to have all this JSX in one file,
// which usually we would probably split up.
// But you get the point.
// So we don't have the data fetching anymore here
// in the component.
// So I hope this wasn't all too confusing.
// And what I mostly want you to retain
// is that when we are using Thunks,
// instead of returning an action object
// from the action creator function,
// we return a new function.
// And so then the result of this becomes a function
// and no longer an object.
// And so then Redux,
// when it sees that we are dispatching a function,
// it will call that function,
// and into that function,
// it'll pass in the dispatch function and getState,
// which we didn't even use, in this case.
// And so then we can use that dispatch function
// inside here to delay that dispatching
// until the asynchronous operation
// that we want to implement has finished.
// And so therefore, we can think of this function here sitting
// between the initial dispatching and the reducer
// in the store receiving the action.
