// src/redux/selectors.js
import { createSelector } from 'reselect';

const selectInterventionsState = (state) => state.interventions;
const selectMetricsState = (state) => state.metrics;

export const getInterventions = createSelector(
    [selectInterventionsState],
    (interventionsState) => interventionsState?.interventionItems || []
);

export const getMetricsByIntervention = createSelector(
    [selectMetricsState],
    (metricsState) => metricsState?.metricsByIntervention || {}
);
