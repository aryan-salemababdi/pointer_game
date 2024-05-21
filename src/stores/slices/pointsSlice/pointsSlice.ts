import { createSlice } from "@reduxjs/toolkit";


interface selectedState {
    point: number
}


const initialState: selectedState = {
    point: 0,
}


const pointer = createSlice({
    name: "pointer",
    initialState,
    reducers: {
        increse: (state, action) => {
            state.point += action.payload;
        }
    }
});


export default pointer.reducer;
export const { increse } = pointer.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const point = (store: { pointer: { point: number } }) => store.pointer.point;