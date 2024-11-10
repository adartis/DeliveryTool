// src/redux/metricsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const metricsSlice = createSlice({
    name: 'metrics',
    initialState: {
        savedData: {},
    },
    reducers: {
        saveMetricsData: (state, action) => {
            const { interventionId, data } = action.payload;
            state.savedData[interventionId] = data;

            // Also save to local storage for persistence
            localStorage.setItem('metricsData', JSON.stringify(state.savedData));
        },
        loadMetricsData: (state) => {
            const storedData = localStorage.getItem('metricsData');
            if (storedData) {
                state.savedData = JSON.parse(storedData);
            }
        },
    },
});

export const { saveMetricsData, loadMetricsData } = metricsSlice.actions;
export default metricsSlice.reducer;
