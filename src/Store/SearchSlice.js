import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
    name: 'counter',
    initialState: {
        search: '',
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        } 
    }
});
const SearchSlice = createSlice({
    name: "filmSearch",
    initialState: {
      value: "",
      genre: "",
      country: "",
    },
    reducers: {
      setSearch: (state, action) => {
        state.value = action.payload;
      },
      setGenre: (state, action) => {
        state.genre = action.payload;
      },
      setCountry: (state, action) => {
        state.country = action.payload;
      },
    },
  });
  
  export const { setGenre, setCountry } = SearchSlice.actions;
  
  export default SearchSlice.reducer;
  
export const { setSearch, action, addCustomNumber } = CounterSlice.actions;
/*export default CounterSlice.reducer;*/