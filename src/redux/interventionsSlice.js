// src/redux/interventionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const interventionsSlice = createSlice({
    name: 'interventions',
    initialState: {
        interventionsByStrategy: {},
    },
    reducers: {
        addInterventionItem: (state, action) => {
            const { strategyId, intervention } = action.payload;

            // Ensure the strategy's interventions array exists
            if (!state.interventionsByStrategy[strategyId]) {
                state.interventionsByStrategy[strategyId] = [];
            }

            // Add the new intervention
            state.interventionsByStrategy[strategyId].push(intervention);
        },
        removeInterventionItem: (state, action) => {
            const { strategyId, index } = action.payload;

            // Only proceed if there are interventions for this strategy
            if (state.interventionsByStrategy[strategyId]) {
                state.interventionsByStrategy[strategyId].splice(index, 1);
            }
        },
    },
});

export const { addInterventionItem, removeInterventionItem } = interventionsSlice.actions;
export default interventionsSlice.reducer;
