// src/redux/scheduleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        scheduleByStrategy: {}, // Store schedules by strategy ID
    },
    reducers: {
        addScheduleItem: (state, action) => {
            const { strategyId, scheduleItem } = action.payload;
            
            // Ensure the item has necessary fields
            if (!scheduleItem.startDate || !scheduleItem.endDate || !scheduleItem.status) {
                console.error("Invalid schedule item: Missing required fields");
                return;
            }

            // Initialize schedule array for strategy if it doesn't exist
            if (!state.scheduleByStrategy[strategyId]) {
                state.scheduleByStrategy[strategyId] = [];
            }

            state.scheduleByStrategy[strategyId].push(scheduleItem);
        },
        removeScheduleItem: (state, action) => {
            const { strategyId, index } = action.payload;
            if (state.scheduleByStrategy[strategyId]) {
                state.scheduleByStrategy[strategyId].splice(index, 1);
            }
        },
        updateScheduleItem: (state, action) => {
            const { strategyId, index, updatedItem } = action.payload;
            if (state.scheduleByStrategy[strategyId] && state.scheduleByStrategy[strategyId][index]) {
                state.scheduleByStrategy[strategyId][index] = updatedItem;
            }
        },
        clearScheduleForStrategy: (state, action) => {
            const { strategyId } = action.payload;
            if (state.scheduleByStrategy[strategyId]) {
                state.scheduleByStrategy[strategyId] = [];
            }
        },
    },
});

export const { addScheduleItem, removeScheduleItem, updateScheduleItem, clearScheduleForStrategy } = scheduleSlice.actions;
export default scheduleSlice.reducer;
