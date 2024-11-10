// src/redux/stakeholdersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const stakeholdersSlice = createSlice({
    name: 'stakeholders',
    initialState: {
        stakeholderItems: [],
    },
    reducers: {
        addStakeholderItem: (state, action) => {
            state.stakeholderItems.push(action.payload);
        },
        removeStakeholderItem: (state, action) => {
            state.stakeholderItems = state.stakeholderItems.filter((_, index) => index !== action.payload);
        },
    },
});

// Export actions as named exports
export const { addStakeholderItem, removeStakeholderItem } = stakeholdersSlice.actions;

// Export reducer as default export
export default stakeholdersSlice.reducer;
