// src/components/Strategy.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStrategyItem, removeStrategyItem } from '../redux/strategySlice.js';

const ElementStrategy = () => {
    const [strategyTitle, setStrategyTitle] = useState('');
    const [strategyDescription, setStrategyDescription] = useState('');
    const [strategyOwner, setStrategyOwner] = useState('');
    const [strategyInfo, setStrategyInfo] = useState('');
    const [editIndex, setEditIndex] = useState(null); // Track which item is being edited
    const [editableItem, setEditableItem] = useState({}); // Temporary state for the editable row

    const strategyItems = useSelector((state) => state.strategy.strategyItems);
    const dispatch = useDispatch();

    const handleAddStrategyItem = () => {
        if (strategyTitle && strategyDescription && strategyOwner && strategyInfo) {
            dispatch(addStrategyItem({ strategyTitle, strategyDescription, strategyOwner, strategyInfo }));
            setStrategyTitle('');
            setStrategyDescription('');
            setStrategyOwner('');
            setStrategyInfo('');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditableItem(strategyItems[index]);
    };

    const handleSave = (index) => {
        dispatch(removeStrategyItem(index)); // Remove the old item
        dispatch(addStrategyItem(editableItem)); // Add the updated item
        setEditIndex(null); // Exit edit mode
    };

    const handleCancel = () => {
        setEditIndex(null);
    };

    const handleInputChange = (field, value) => {
        setEditableItem((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div>
            <h2>Strategy</h2>
            <p>This section contains information about the strategy you are planning to implement.</p>

            {strategyItems.length > 0 ? (
                <table className="generalTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Owner</th>
                            <th>Relevant links and references</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {strategyItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            value={editableItem.strategyTitle}
                                            onChange={(e) => handleInputChange('strategyTitle', e.target.value)}
                                        />
                                    ) : (
                                        item.strategyTitle
                                    )}
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <textarea
                                            value={editableItem.strategyDescription}
                                            onChange={(e) => handleInputChange('strategyDescription', e.target.value)}
                                        />
                                    ) : (
                                        item.strategyDescription
                                    )}
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            value={editableItem.strategyOwner}
                                            onChange={(e) => handleInputChange('strategyOwner', e.target.value)}
                                        />
                                    ) : (
                                        item.strategyOwner
                                    )}
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <textarea
                                            value={editableItem.strategyInfo}
                                            onChange={(e) => handleInputChange('strategyInfo', e.target.value)}
                                        />
                                    ) : (
                                        item.strategyInfo
                                    )}
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <>
                                            <button onClick={() => handleSave(index)}>Save</button>
                                            <button onClick={handleCancel}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(index)}>Edit</button>
                                            <button onClick={() => dispatch(removeStrategyItem(index))}>Remove</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No strategy listed.</p>
            )}

            <div className="rowContainer">
                <h2>Enter strategy details</h2>
                <label>Strategy title:</label>
                <input
                    type="text"
                    value={strategyTitle}
                    onChange={(e) => setStrategyTitle(e.target.value)}
                    placeholder="Enter strategy title"
                />

                <label>Description:</label>
                <textarea
                    value={strategyDescription}
                    onChange={(e) => setStrategyDescription(e.target.value)}
                    placeholder="Describe the activity"
                    rows="3"
                    cols="30"
                />

                <label>Owner:</label>
                <input
                    type="text"
                    value={strategyOwner}
                    onChange={(e) => setStrategyOwner(e.target.value)}
                    placeholder="Enter owner"
                />

                <label>Relevant links and references:</label>
                <textarea
                    value={strategyInfo}
                    onChange={(e) => setStrategyInfo(e.target.value)}
                    placeholder="Add associated information pertinent to the strategy"
                    rows="3"
                    cols="30"
                />

                <button onClick={handleAddStrategyItem}>Add to Strategy</button>
            </div>
        </div>
    );
};

export default ElementStrategy;
