// src/components/Metrics.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { parse } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const Metrics = () => {
    const interventionsByStrategy = useSelector((state) => state.interventions.interventionsByStrategy);
    const strategyItems = useSelector((state) => state.strategy.strategyItems);
    const dispatch = useDispatch();

    const [selectedIntervention, setSelectedIntervention] = useState('');
    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(["Description", "Time Reference", "Baseline", "Expected Impact of Intervention", "Actual Performance"]);
    const [tempGridData, setTempGridData] = useState(Array(3).fill().map(() => Array(columns.length).fill('')));
    const [savedData, setSavedData] = useState(() => {
        // Load saved data from localStorage if available
        const storedData = localStorage.getItem('metricsData');
        return storedData ? JSON.parse(storedData) : {};
    });

    useEffect(() => {
        // Save data to localStorage on change
        localStorage.setItem('metricsData', JSON.stringify(savedData));
    }, [savedData]);

    const formatDate = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        if (cleanedValue.length <= 2) return cleanedValue;
        if (cleanedValue.length <= 4) return `${cleanedValue.slice(0, 2)}-${cleanedValue.slice(2)}`;
        return `${cleanedValue.slice(0, 2)}-${cleanedValue.slice(2, 4)}-${cleanedValue.slice(4, 8)}`;
    };

    const handleInputChange = (rowIndex, colIndex, value) => {
        const updatedGrid = [...tempGridData];
        updatedGrid[rowIndex][colIndex] = colIndex === 1 ? formatDate(value) : value;
        setTempGridData(updatedGrid);
    };

    const addRow = () => {
        setTempGridData([...tempGridData, Array(columns.length).fill('')]);
        setRows(rows + 1);
    };

    const addColumn = () => {
        const columnTitle = prompt("Enter the title for the new column:");
        if (columnTitle) {
            setColumns([...columns, columnTitle]);
            const updatedGrid = tempGridData.map(row => [...row, '']);
            setTempGridData(updatedGrid);
        }
    };

    const deleteColumn = (colIndex) => {
        const updatedColumns = columns.filter((_, index) => index !== colIndex);
        setColumns(updatedColumns);
        const updatedGrid = tempGridData.map(row => row.filter((_, index) => index !== colIndex));
        setTempGridData(updatedGrid);
    };

    const handleSave = () => {
        if (selectedIntervention) {
            const updatedData = { ...savedData, [selectedIntervention]: tempGridData };
            setSavedData(updatedData);
        }
    };

    const processChartData = () => {
        if (!savedData[selectedIntervention]) return null;

        const sortedData = [...savedData[selectedIntervention]].sort((a, b) => {
            const dateA = parse(a[1], 'dd-MM-yyyy', new Date());
            const dateB = parse(b[1], 'dd-MM-yyyy', new Date());
            return dateA - dateB;
        });

        const dates = sortedData.map(row => parse(row[1], 'dd-MM-yyyy', new Date()));

        const datasets = columns.slice(2).map((colName, colIndex) => ({
            label: colName,
            data: sortedData.map(row => ({
                x: parse(row[1], 'dd-MM-yyyy', new Date()),
                y: parseFloat(row[colIndex + 2]) || null,
            })),
            borderColor: `hsl(${(colIndex * 60) % 360}, 70%, 50%)`,
            tension: 0.1,
        }));

        const allValues = sortedData.flatMap(row => row.slice(2).map(value => parseFloat(value)).filter(v => !isNaN(v)));
        const minValue = Math.min(...allValues);
        const maxValue = Math.max(...allValues);

        return {
            labels: dates,
            datasets,
            options: {
                scales: {
                    x: { type: 'time', time: { unit: 'month', tooltipFormat: 'dd-MM-yyyy' }, title: { display: true, text: 'Time Reference' } },
                    y: { min: minValue, max: maxValue, title: { display: true, text: 'Values' } },
                },
            },
        };
    };

    const chartData = processChartData();

    return (
        <div>
            <h2>Metrics</h2>
            <p>This section contains information about metrics.</p>

            {/* Dropdown for selecting an intervention */}
            <label>Select Strategy:</label>
            <select value={selectedIntervention} onChange={(e) => setSelectedIntervention(e.target.value)}>
                <option value="">Select intervention</option>
                {strategyItems.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.strategyTitle}
                    </option>
                ))}
            </select>

            {/* Display Saved Data Table */}
            {savedData[selectedIntervention] && (
                <div>
                    <p>Saved Data for {selectedIntervention}</p>
                    <table className="metrics-table">
                        <thead>
                            <tr>
                                <th className="metrics-th">Index</th>
                                {columns.map((colTitle, colIndex) => (
                                    <th key={colIndex} className="metrics-th">{colTitle}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {savedData[selectedIntervention].map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="metrics-td">{rowIndex + 1}</td>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex} className="metrics-td">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Chart for Selected Intervention */}
            {chartData && (
                <div>
                    <h3>Metrics Over Time for {selectedIntervention}</h3>
                    <Line data={chartData} options={chartData.options} />
                </div>
            )}

            {/* Editable Grid for Data Input */}
            <br />
            <p>Manipulate the above grid in the below section: </p>
            // Editable Grid for Data Input
<table>
    <thead>
        <tr>
            <th className="metrics-th">Index</th>
            {columns.map((colTitle, colIndex) => (
                <th key={colIndex} className="metrics-th">{colTitle}</th>
            ))}
        </tr>
    </thead>
    <tbody>
        {tempGridData.map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td className="metrics-td">{rowIndex + 1}</td>
                {row.map((cell, colIndex) => (
                    <td key={colIndex} className="metrics-td">
                        {colIndex === 0 ? (
                            // Render a textarea for the "Description" column (assuming it's the first column)
                            <textarea
                                className="metrics-input"
                                value={cell}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                placeholder="Enter description"
                                rows="2" // You can adjust rows as desired
                                cols="20" // Adjust column width as needed
                            />
                        ) : (
                            <input
                                type={colIndex === 1 ? "text" : "number"}
                                className="metrics-input"
                                value={cell}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                placeholder={colIndex === 1 ? "dd-mm-yyyy" : ""}
                            />
                        )}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
</table>


            <button onClick={addRow}>Add Row</button>
            <button onClick={addColumn}>Add Column</button>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Metrics;
