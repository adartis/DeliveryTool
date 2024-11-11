// src/components/ElementSchedule.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addScheduleItem, removeScheduleItem, updateScheduleItem } from '../redux/scheduleSlice';
import '../style.css';

const ElementSchedule = () => {
    const dispatch = useDispatch();
    const strategies = useSelector((state) => state.strategy.strategyItems);
    const scheduleByStrategy = useSelector((state) => state.schedule.scheduleByStrategy);

    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Not started');
    const [editIndex, setEditIndex] = useState(null);
    const [editableRow, setEditableRow] = useState({});
    const [globalDateRange, setGlobalDateRange] = useState({ minDate: null, maxDate: null });

    /**
     * useEffect hook: Monitors changes in schedule items and selected strategy.
     * Recalculates the global date range (min and max dates across all items) 
     * each time the strategy or its schedule items are updated.
     */
    useEffect(() => {
        const range = getGlobalDateRange();
        setGlobalDateRange(range);
    }, [scheduleByStrategy, selectedStrategy]);

    /**
     * Adds a new schedule item associated with the currently selected strategy.
     * Dispatches the addScheduleItem action, updating the Redux store,
     * and resets the form fields to their initial state.
     */
    const addNewScheduleItem = () => {
        if (selectedStrategy && title && description && startDate && endDate) {
            const newScheduleItem = { title, description, startDate, endDate, status };
            dispatch(addScheduleItem({ strategyId: selectedStrategy, scheduleItem: newScheduleItem }));
            setTitle(''); setDescription(''); setStartDate(''); setEndDate(''); setStatus('Not started');
        }
    };

    /**
     * Sets the selected schedule item to be edited by updating the editIndex
     * and populating editableRow with the item’s details, enabling inline editing.
     */
    const handleEdit = (index, item) => {
        setEditIndex(index);
        setEditableRow({ ...item });
    };

    /**
     * Saves the edited schedule item by dispatching the updateScheduleItem action.
     * Updates the item in the Redux store, then exits edit mode by clearing editIndex.
     */
    const handleSave = (index) => {
        dispatch(updateScheduleItem({ strategyId: selectedStrategy, index, updatedItem: editableRow }));
        setEditIndex(null);
    };

    /**
     * Updates a field of the currently editable row.
     * Takes the field name and value, setting the field in editableRow to the new value.
     */
    const handleChange = (field, value) => setEditableRow({ ...editableRow, [field]: value });

    /**
     * Parses a date string (formatted as YYYY-MM-DD) and returns a Date object.
     * Helper function to standardise date handling across components.
     */
    const parseDate = (dateString) => new Date(dateString);

    /**
     * Calculates the global date range for the selected strategy.
     * Returns the earliest start date and latest end date from all schedule items,
     * facilitating the scaled rendering of Gantt bars across a fixed width.
     */
    const getGlobalDateRange = () => {
        const dates = scheduleByStrategy[selectedStrategy]?.flatMap(item => [parseDate(item.startDate), parseDate(item.endDate)]);
        return {
            minDate: dates && dates.length > 0 ? new Date(Math.min(...dates)) : null,
            maxDate: dates && dates.length > 0 ? new Date(Math.max(...dates)) : null,
        };
    };

    /**
     * Calculates the width of a Gantt bar for a schedule item.
     * Scales the bar’s width as a proportion of the total date range, fitting within a 40vw container.
     * Returns 0 if there is no defined global date range.
     */
    const calculateScaledBarWidth = (start, end) => {
        const { minDate, maxDate } = globalDateRange;
        if (!minDate || !maxDate) return 0;
        const totalRange = maxDate - minDate;
        const barRange = parseDate(end) - parseDate(start);
        return (barRange / totalRange) * 40; 
    };

    /**
     * Calculates the horizontal position of a Gantt bar for a schedule item.
     * Determines the offset from the start of the container, scaled within a 40vw width.
     * Returns 0 if there is no defined global date range.
     */
    const calculateScaledBarPosition = (start) => {
        const { minDate, maxDate } = globalDateRange;
        if (!minDate || !maxDate) return 0;
        const totalRange = maxDate - minDate;
        const offset = parseDate(start) - minDate;
        return (offset / totalRange) * 40; 
    };

    /**
     * Formats a date string from "YYYY-MM-DD" to "DD-MM".
     * Used to display dates in a shorter format within the table.
     */
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}`;
    };

    /**
     * Returns a color based on the status of a schedule item.
     * Maps each possible status to a color, used in rendering Gantt bars.
     */
    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'green';
            case 'In progress':
                return 'blue';
            case 'For review':
                return 'orange';
            case 'Requires attention':
                return 'red';
            default:
                return 'grey';
        }
    };

    /**
     * Renders an individual Gantt bar for a schedule item.
     * Scales and positions the bar within a 40vw container based on the item’s dates.
     * Uses the status color to set the bar’s background color.
     */
    const renderGanttBar = (item) => {
        const barWidth = calculateScaledBarWidth(item.startDate, item.endDate);
        const barPosition = calculateScaledBarPosition(item.startDate);

        return (
            <div
                className="gantt-bar-container"
                style={{ width: '40vw', display: 'flex', justifyContent: 'flex-start' }}
            >
                <div
                    className="gantt-bar"
                    style={{
                        width: `${barWidth}vw`,
                        marginLeft: `${barPosition}vw`,
                        backgroundColor: getStatusColor(item.status),
                    }}
                ></div>
            </div>
        );
    };

    return (
        <div>
            <h2>Schedule</h2>
            <p>This section contains information about the schedule for delivery.</p>

            <label>Choose Strategy:</label>
            <select value={selectedStrategy} onChange={(e) => setSelectedStrategy(e.target.value)}>
                <option value="">Select a strategy</option>
                {strategies.map((strategy, index) => (
                    <option key={strategy.id || index} value={strategy.id || index}>
                        {strategy.strategyTitle}
                    </option>
                ))}
            </select>

            <div className="table-container">
                {selectedStrategy && scheduleByStrategy[selectedStrategy]?.length > 0 ? (
                    <table className="generalTable">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Gantt Chart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleByStrategy[selectedStrategy]
                                .slice()
                                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                                .map((item, index) => (
                                    <tr key={index}>
                                        <td>{editIndex === index ? (
                                            <input
                                                type="text"
                                                value={editableRow.title}
                                                onChange={(e) => handleChange("title", e.target.value)}
                                            />
                                        ) : (
                                            item.title
                                        )}</td>
                                        <td>{editIndex === index ? (
                                            <textarea
                                                value={editableRow.description}
                                                onChange={(e) => handleChange("description", e.target.value)}
                                            />
                                        ) : (
                                            item.description
                                        )}</td>
                                        <td>{editIndex === index ? (
                                            <input
                                                type="date"
                                                value={editableRow.startDate}
                                                onChange={(e) => handleChange("startDate", e.target.value)}
                                            />
                                        ) : (
                                            formatDate(item.startDate)
                                        )}</td>
                                        <td>{editIndex === index ? (
                                            <input
                                                type="date"
                                                value={editableRow.endDate}
                                                onChange={(e) => handleChange("endDate", e.target.value)}
                                            />
                                        ) : (
                                            formatDate(item.endDate)
                                        )}</td>
                                        <td>{editIndex === index ? (
                                            <select
                                                value={editableRow.status}
                                                onChange={(e) => handleChange("status", e.target.value)}
                                            >
                                                <option value="Not started">Not started</option>
                                                <option value="In progress">In progress</option>
                                                <option value="For review">For review</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Requires attention">Requires attention</option>
                                            </select>
                                        ) : (
                                            item.status
                                        )}</td>
                                        <td>{editIndex === index ? (
                                            <button onClick={() => handleSave(index)}>Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(index, item)}>Edit</button>
                                                <button onClick={() => dispatch(removeScheduleItem({ strategyId: selectedStrategy, index }))}>
                                                    Remove
                                                </button>
                                            </>
                                        )}</td>
                                        <td>
                                            <div className="gantt-bar-container">
                                                {renderGanttBar(item)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No schedule items listed for the selected strategy.</p>
                )}
            </div>

            <div className="rowContainer">
                <h2>Enter schedule items for implementation: </h2>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the activity" rows="3" cols="30" />
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="For review">For review</option>
                    <option value="Completed">Completed</option>
                    <option value="Requires attention">Requires attention</option>
                </select>
                <button onClick={addNewScheduleItem} disabled={!selectedStrategy}>
                    Add to Schedule
                </button>
            </div>
        </div>
    );
};

export default ElementSchedule;
