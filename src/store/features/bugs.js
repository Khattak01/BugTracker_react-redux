import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let i = 0
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    error: ''
  },
  reducers: {
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      // console.log('bugId>>>',bugId)
      // console.log('userId>>>',userId)
      // console.log('bugs.list>>>',bugs.list)
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      // console.log('index>>>',index)
      bugs.list[index].userId = userId;
    },

    // command - event
    // addBug - bugAdded
    bugAdded: (bugs, action) => {
      bugs.list.push({ ...action.payload, id: i });
      i++;
    },

    // resolveBug (command) - bugResolved (event)
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = action.payload.resolved || false;
    },
    bugDeleted: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list.splice(index,1)
      // if(!bugs.list.length)
      //   i=0;
    },
    errorOccured: (bugs, action) => {
      bugs.error = action.payload
    },
    errorResolved: (bugs) => {
      bugs.error = ''
    }
  }
});

export const {
  bugAdded,
  bugResolved,
  bugDeleted,
  bugAssignedToUser,
  errorOccured,
  errorResolved
} = slice.actions;
export default slice.reducer;


// Selector

// Memoization
// bugs => get unresolved bugs from the cache
export const selectBugs = state => state.bugs.list;
export const selectBugsError = state => state.bugs.error;

export const getBugsByUser = userId =>
  createSelector(
    state => state.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
  );

export const getUnresolvedBugs = createSelector(
  state => state.bugs,
  (bugs) => bugs.list.filter(bug => !bug.resolved)
);
