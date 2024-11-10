// src/redux/risksAndIssuesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const risksAndIssuesSlice = createSlice({
    name: 'risksAndIssues',
    initialState: {
        risksAndIssuesByStrategy: {},
    },
    reducers: {
        addRiskOrIssueItem: (state, action) => {
            const { strategyId, riskOrIssue } = action.payload;
            if (!state.risksAndIssuesByStrategy[strategyId]) {
                state.risksAndIssuesByStrategy[strategyId] = [];
            }
            state.risksAndIssuesByStrategy[strategyId].push(riskOrIssue);
        },
        removeRiskOrIssueItem: (state, action) => {
            const { strategyId, index } = action.payload;
            if (state.risksAndIssuesByStrategy[strategyId]) {
                state.risksAndIssuesByStrategy[strategyId].splice(index, 1);
            }
        },
    },
});

// Selectors for accessing specific data
export const selectRisksAndIssuesByStrategy = (state, strategyId) =>
    state.risksAndIssues.risksAndIssuesByStrategy[strategyId] || [];

// Export actions as named exports
export const { addRiskOrIssueItem, removeRiskOrIssueItem } = risksAndIssuesSlice.actions;

// Export reducer as default export
export default risksAndIssuesSlice.reducer;
