// src/components/ElementInterventions.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInterventionItem, removeInterventionItem } from '../redux/interventionsSlice';

const ElementInterventions = () => {
    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [interventionTitle, setInterventionTitle] = useState('');
    const [interventionDescription, setInterventionDescription] = useState('');
    const [interventionOwner, setInterventionOwner] = useState('');
    const [interventionEndDate, setInterventionEndDate] = useState('');

    const strategyItems = useSelector((state) => state.strategy.strategyItems) || []; // Handle undefined strategyItems
    const interventionsByStrategy = useSelector((state) => state.interventions.interventionsByStrategy) || {}; // Default to empty object
    const dispatch = useDispatch();

    // Date formatting helper
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Handle adding a new intervention item
    const handleAddInterventionItem = () => {
        if (selectedStrategy && interventionTitle && interventionDescription && interventionOwner && interventionEndDate) {
            const intervention = { interventionTitle, interventionDescription, interventionOwner, interventionEndDate };
            dispatch(addInterventionItem({ strategyId: selectedStrategy, intervention }));
            // Reset input fields
            setInterventionTitle('');
            setInterventionDescription('');
            setInterventionOwner('');
            setInterventionEndDate('');
        }
    };

    return (
        <div>
            <h2>Interventions</h2>
            <p>Select a strategy to add interventions associated with it.</p>

            {/* Strategy Selection */}
            <label>Choose Strategy:</label>
            <select
                value={selectedStrategy}
                onChange={(e) => setSelectedStrategy(e.target.value)}
            >
                <option value="">Select a strategy</option>
                {strategyItems.map((strategy, index) => (
                    <option key={strategy.id || index} value={strategy.id}>
                        {strategy.strategyTitle}
                    </option>
                ))}
            </select>

            {/* Display Interventions Table */}
            {selectedStrategy && interventionsByStrategy[selectedStrategy]?.length > 0 ? (
                <table className="generalTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Owner</th>
                            <th>Target end date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interventionsByStrategy[selectedStrategy]
                            .slice()
                            .sort((a, b) => new Date(a.interventionEndDate) - new Date(b.interventionEndDate))
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.interventionTitle}</td>
                                    <td>{item.interventionDescription}</td>
                                    <td>{item.interventionOwner}</td>
                                    <td>{formatDate(item.interventionEndDate)}</td>
                                    <td>
                                        <button onClick={() => dispatch(removeInterventionItem({ strategyId: selectedStrategy, index }))}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            ) : (
                selectedStrategy && <p>No interventions listed for this strategy.</p>
            )}

            {/* Form to Add New Intervention */}
            <div className="rowContainer">
                <h2>Enter details of the planned interventions</h2>
                <label>Intervention title:</label>
                <input
                    type="text"
                    value={interventionTitle}
                    onChange={(e) => setInterventionTitle(e.target.value)}
                    placeholder="Enter intervention title"
                />

                <label>Description:</label>
                <textarea
                    value={interventionDescription}
                    onChange={(e) => setInterventionDescription(e.target.value)}
                    placeholder="Describe the intervention"
                />
                <label>Intervention owner:</label>
                <input
                    type="text"
                    value={interventionOwner}
                    onChange={(e) => setInterventionOwner(e.target.value)}
                    placeholder="Enter owner of the intervention"
                />
                <label>Target end date: </label>
                <input
                    type="date"
                    value={interventionEndDate}
                    onChange={(e) => setInterventionEndDate(e.target.value)}
                />

                <button onClick={handleAddInterventionItem} disabled={!selectedStrategy}>
                    Add Intervention
                </button>
            </div>
        </div>
    );
};

export default ElementInterventions;
