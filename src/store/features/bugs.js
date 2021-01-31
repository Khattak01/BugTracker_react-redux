import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import db from '../../firebase'

let i = 0
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    error: '',
    loading: false
  },
  reducers: {
    bugsLoaded: (bugs, action) => {
      bugs.list = action.payload.list;

    },
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
      bugs.list.splice(index, 1)
      // if(!bugs.list.length)
      //   i=0;
    },
    errorOccured: (bugs, action) => {
      bugs.error = action.payload
    },
    errorResolved: (bugs) => {
      bugs.error = ''
    },
    setLoading:(bugs,action)=>{
      bugs.loading = action.payload.loading
    }
  }
});

export const {
  bugAdded,
  bugResolved,
  bugDeleted,
  bugAssignedToUser,
  setLoading,
  errorOccured,
  errorResolved
} = slice.actions;
export default slice.reducer;

export const loadBugs = () => async dispatch => {
  dispatch(setLoading({loading:true}))
  const response = await db.collection('bugs').get()
  if (response.empty) {
    console.log('NO document exists in the db')
    return;
  }
  // response.forEach( doc => console.log('doc.data() >> ',doc.data()))
  let bugList = []
  response.forEach(doc => bugList.push(doc.data()))
  dispatch(slice.actions.bugsLoaded({ list: bugList}))
  // console.log(bugList)
  dispatch(setLoading({loading:false}))
};


// export const uploadBugs = () => async (dispatch, getState) => { or we can write this like as we can get the bugs from our ui
export const uploadBugs = (bugs) => async (dispatch) => {// we can upload it directly from the UI as well
  dispatch(setLoading({loading:true}))
  const bugsRef = db.collection("bugs")
  bugs.forEach(async bug => {
    // getState().bugs.list.forEach(async bug => {
      const snapshot = await bugsRef.where('description', '==', bug.description).get();
    if (snapshot.empty) {
      // console.log('No matching documents.');
      bugsRef.add(bug)
      return;
    }
    //   console.log('document exists already')
  });
  dispatch(setLoading({loading:false}))
}

// Selector

// Memoization
// bugs => get unresolved bugs from the cache
export const selectBugs = state => state.bugs ? state.bugs.list : [];
export const selectBugsError = state => state.bugs.error;

export const getBugsByUser = userId =>

  createSelector(
    state => state.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
  );

