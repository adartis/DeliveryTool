// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import strategyReducer from './strategySlice';
import interventionsReducer from './interventionsSlice';
import scheduleReducer from './scheduleSlice';
import metricsReducer from './metricsSlice';
import stakeholdersReducer from './stakeholdersSlice';
import risksAndIssuesReducer from './risksAndIssuesSlice';

const store = configureStore({
    reducer: {
        strategy: strategyReducer,
        interventions: interventionsReducer,
        schedule: scheduleReducer,
        metrics: metricsReducer,
        risksAndIssues: risksAndIssuesReducer, // Fixed key name
        stakeholders: stakeholdersReducer,
    },
});

export default store;
