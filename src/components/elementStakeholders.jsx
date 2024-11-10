// src/components/Stakeholders.jsx
import React, { useState } from 'react';

const Stakeholders = () => {
  const [rows, setRows] = useState([
    {
      name: '',
      role: '',
      email: '',
      phone: '',
      preferredContact: 'Email',
      comment: '',
    },
  ]);
  const [savedStakeholders, setSavedStakeholders] = useState([]); // State for saved stakeholders

  const addRow = () => {
    setRows([
      ...rows,
      {
        name: '',
        role: '',
        email: '',
        phone: '',
        preferredContact: 'Email',
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
    setSavedStakeholders([...savedStakeholders, ...rows]); // Add rows to saved stakeholders
    setRows([
      {
        name: '',
        role: '',
        email: '',
        phone: '',
        preferredContact: 'Email',
        comment: '',
      },
    ]);
  };

  const handleRemove = (index) => {
    setSavedStakeholders(savedStakeholders.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Stakeholders</h2>
      <p>This section contains information about stakeholders.</p>

      {/* Input Table */}
      <table className="scheduleTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Preferred Means of Contact</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.role}
                  onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={row.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="tel"
                  value={row.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={row.preferredContact}
                  onChange={(e) => handleInputChange(index, 'preferredContact', e.target.value)}
                >
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="Text">Text</option>
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
      <button onClick={handleSave}>Save</button>

      {/* Output Table for Saved Stakeholders */}
      {savedStakeholders.length > 0 && (
        <div>
          <h3>Saved Stakeholders</h3>
          <table className="scheduleTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Preferred Means of Contact</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {savedStakeholders.map((stakeholder, index) => (
                <tr key={index}>
                  <td>{stakeholder.name}</td>
                  <td>{stakeholder.role}</td>
                  <td>{stakeholder.email}</td>
                  <td>{stakeholder.phone}</td>
                  <td>{stakeholder.preferredContact}</td>
                  <td>{stakeholder.comment}</td>
                  <td>
                    <button onClick={() => handleRemove(index)}>Remove</button>
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

export default Stakeholders;
