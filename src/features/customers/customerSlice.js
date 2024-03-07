import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      // prepare: function(fullName, nationalID)
      // below
      //       this is just a simplified way of writing methods
      // in modern JavaScript.
      prepare(fullName, nationalID) {
        return {
          payload: { fullName, nationalID, createAt: new Date().toISOString },

          //           remember also the created at property,
          // which we set to new date and then to this ISO string.
          // Now right and so this is again the kind of
          // small side effect that you should not do inside the reducer
          // but instead right here in this prepare function.
          // So in case you wanted to add this created ad here
          // or maybe you also want it like for example to compute
          // a random ID, then you should not do that in the reducer.
          // But instead then you should also create
          // a prepare method like this.
          // So even if this only takes for example, one input,
          // then you still would have to do this prepare function
          // if you wanted to create a date or assign a random ID
          // or something like that.
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createAt = action.payload.createAt;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createAt: action.payload.createAt,
//       };

//     case "customer/updateName":
//       return { ...state, fullName: action.payload };

//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName: fullName,
//       nationalID: nationalID,

//       createAt: new Date().toISOString,
//     },
//   };
// }

// export function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }
