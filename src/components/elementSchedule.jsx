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

    const addNewScheduleItem = () => {
        if (selectedStrategy && title && description && startDate && endDate) {
            const newScheduleItem = { title, description, startDate, endDate, status };
            dispatch(addScheduleItem({ strategyId: selectedStrategy, scheduleItem: newScheduleItem }));
            setTitle(''); setDescription(''); setStartDate(''); setEndDate(''); setStatus('Not started');
        }
    };

    const handleEdit = (index, item) => {
        setEditIndex(index);
        setEditableRow({ ...item });
    };

    const handleSave = (index) => {
        dispatch(updateScheduleItem({ strategyId: selectedStrategy, index, updatedItem: editableRow }));
        setEditIndex(null);
    };

    const handleChange = (field, value) => setEditableRow({ ...editableRow, [field]: value });

    const parseDate = (dateString) => new Date(dateString);

    const calculateBarWidth = (start, end) => {
        const oneDay = 1000 * 60 * 60 * 24;
        return (parseDate(end) - parseDate(start)) / oneDay;
    };

    const calculateBarPosition = (start, minDate) => {
        const oneDay = 1000 * 60 * 60 * 24;
        return (parseDate(start) - parseDate(minDate)) / oneDay;
    };

    const getEarliestDate = () => {
        const dates = scheduleByStrategy[selectedStrategy]?.map(item => parseDate(item.startDate));
        return dates && dates.length > 0 ? new Date(Math.min(...dates)) : new Date();
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}`;
    };

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

    const renderGanttBar = (item, minDate) => {
        const barWidth = calculateBarWidth(item.startDate, item.endDate) * 10;
        const barPosition = calculateBarPosition(item.startDate, minDate) * 10;
        return (
            <div
                className="gantt-bar"
                style={{
                    width: `${barWidth}px`,
                    marginLeft: `${barPosition}px`,
                    backgroundColor: getStatusColor(item.status) // Conditional color based on status
                }}
            ></div>
        );
    };

    const minDate = getEarliestDate();

    return (
        <div>
            <h2>Schedule</h2>
            <p>This section contains information about the schedule for delivery.</p>

            {/* Strategy Dropdown */}
            <label>Choose Strategy:</label>
            <select value={selectedStrategy} onChange={(e) => setSelectedStrategy(e.target.value)}>
                <option value="">Select a strategy</option>
                {strategies.map((strategy, index) => (
                    <option key={strategy.id || index} value={strategy.id || index}>
                        {strategy.strategyTitle}
                    </option>
                ))}
            </select>

            {/* Schedule Table with Gantt Chart Column */}
            <div className="table-container">
                {selectedStrategy && scheduleByStrategy[selectedStrategy]?.length > 0 ? (
                    <table className="scheduleTable">
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
                                            formatDate(item.startDate)  // Show "dd-mm"
                                        )}</td>
                                        <td>{editIndex === index ? (
                                            <input
                                                type="date"
                                                value={editableRow.endDate}
                                                onChange={(e) => handleChange("endDate", e.target.value)}
                                            />
                                        ) : (
                                            formatDate(item.endDate)  // Show "dd-mm"
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
                                        <td>{renderGanttBar(item, minDate)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No schedule items listed for the selected strategy.</p>
                )}
            </div>

            {/* Form to Add New Schedule Item */}
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
