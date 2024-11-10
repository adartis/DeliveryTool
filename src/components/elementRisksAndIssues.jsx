// src/components/RisksAndIssues.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRiskOrIssueItem, removeRiskOrIssueItem } from '../redux/risksAndIssuesSlice';

const RisksAndIssues = () => {
  const dispatch = useDispatch();
  const strategies = useSelector((state) => state.strategy.strategyItems) || [];
  const risksAndIssuesByStrategy = useSelector((state) => state.risksAndIssues.risksAndIssuesByStrategy) || {};

  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [rows, setRows] = useState([
    {
      interventionTitle: '',
      riskOrIssue: 'Risk',
      description: '',
      likelihood: 'Low',
      impact: 'Low',
      mitigation: '',
      postMitigationLikelihood: 'Low',
      postMitigationImpact: 'Low',
      comment: '',
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        interventionTitle: '',
        riskOrIssue: 'Risk',
        description: '',
        likelihood: 'Low',
        impact: 'Low',
        mitigation: '',
        postMitigationLikelihood: 'Low',
        postMitigationImpact: 'Low',
        comment: '',
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSave = () => {
    if (selectedStrategy) {
      rows.forEach((row) => {
        dispatch(addRiskOrIssueItem({ strategyId: selectedStrategy, riskOrIssue: row }));
      });
      setRows([
        {
          interventionTitle: '',
          riskOrIssue: 'Risk',
          description: '',
          likelihood: 'Low',
          impact: 'Low',
          mitigation: '',
          postMitigationLikelihood: 'Low',
          postMitigationImpact: 'Low',
          comment: '',
        },
      ]);
    }
  };

  return (
    <div>
      <h2>Risks and Issues</h2>
      <p>This section contains information about risks and issues.</p>
      
      {/* Strategy Dropdown */}
      <label>Choose Strategy:</label>
      <select
        value={selectedStrategy}
        onChange={(e) => setSelectedStrategy(e.target.value)}
      >
        <option value="">Select a strategy</option>
        {strategies.map((strategy, index) => (
          <option key={strategy.id || index} value={strategy.id || index}>
            {strategy.strategyTitle}
          </option>
        ))}
      </select>

      {/* Input Table */}
      <table className="scheduleTable">
        <thead>
          <tr>
            <th>Intervention Title</th>
            <th>Risk or Issue</th>
            <th>Description</th>
            <th>Likelihood</th>
            <th>Impact</th>
            <th>Mitigation</th>
            <th>Post-Mitigation Likelihood</th>
            <th>Post-Mitigation Impact</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.interventionTitle}
                  onChange={(e) => handleInputChange(index, 'interventionTitle', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={row.riskOrIssue}
                  onChange={(e) => handleInputChange(index, 'riskOrIssue', e.target.value)}
                >
                  <option value="Risk">Risk</option>
                  <option value="Issue">Issue</option>
                </select>
              </td>
              <td>
                <textarea
                  value={row.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={row.likelihood}
                  onChange={(e) => handleInputChange(index, 'likelihood', e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </td>
              <td>
                <select
                  value={row.impact}
                  onChange={(e) => handleInputChange(index, 'impact', e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </td>
              <td>
                <textarea
                  value={row.mitigation}
                  onChange={(e) => handleInputChange(index, 'mitigation', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={row.postMitigationLikelihood}
                  onChange={(e) => handleInputChange(index, 'postMitigationLikelihood', e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </td>
              <td>
                <select
                  value={row.postMitigationImpact}
                  onChange={(e) => handleInputChange(index, 'postMitigationImpact', e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={row.comment}
                  onChange={(e) => handleInputChange(index, 'comment', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={addRow}>Add Row</button>
      <button onClick={handleSave} disabled={!selectedStrategy}>Save</button>

      {/* Output Table for Saved Risks and Issues */}
      {selectedStrategy && risksAndIssuesByStrategy[selectedStrategy]?.length > 0 && (
        <div>
          <h3>Saved Risks and Issues for Selected Strategy</h3>
          <table className="scheduleTable">
            <thead>
              <tr>
                <th>Intervention Title</th>
                <th>Risk or Issue</th>
                <th>Description</th>
                <th>Likelihood</th>
                <th>Impact</th>
                <th>Mitigation</th>
                <th>Post-Mitigation Likelihood</th>
                <th>Post-Mitigation Impact</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {risksAndIssuesByStrategy[selectedStrategy].map((item, index) => (
                <tr key={index}>
                  <td>{item.interventionTitle}</td>
                  <td>{item.riskOrIssue}</td>
                  <td>{item.description}</td>
                  <td>{item.likelihood}</td>
                  <td>{item.impact}</td>
                  <td>{item.mitigation}</td>
                  <td>{item.postMitigationLikelihood}</td>
                  <td>{item.postMitigationImpact}</td>
                  <td>{item.comment}</td>
                  <td>
                    <button onClick={() => dispatch(removeRiskOrIssueItem({ strategyId: selectedStrategy, index }))}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RisksAndIssues;
