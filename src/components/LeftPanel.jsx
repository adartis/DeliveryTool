// src/components/LeftPanel.jsx
import React from 'react';

const LeftPanel = ({ onElementClick }) => {
  return (
    <div className="leftPanel">
      <button onClick={() => onElementClick('Strategy')}>Strategy</button>
      <button onClick={() => onElementClick('Interventions')}>Interventions</button>
      <button onClick={() => onElementClick('Schedule')}>Schedule</button>
      <button onClick={() => onElementClick('Success Metrics')}>Metrics</button>
      <button onClick={() => onElementClick('Risks and Issues')}>Risks and Issues</button>
      <button onClick={() => onElementClick('Stakeholders')}>Stakeholders</button>
    </div>
  );
};

export default LeftPanel;
