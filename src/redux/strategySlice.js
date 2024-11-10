// src/redux/strategySlice.js
import { createSlice } from '@reduxjs/toolkit';

const strategySlice = createSlice({
    name: 'strategy',
    initialState: {
        strategyItems: [],
    },
    reducers: {
        addStrategyItem: (state, action) => {
            state.strategyItems.push(action.payload);
        },
        removeStrategyItem: (state, action) => {
            state.strategyItems = state.strategyItems.filter((_, index) => index !== action.payload);
        },
    },
});

export const { addStrategyItem, removeStrategyItem } = strategySlice.actions;
export default strategySlice.reducer;
