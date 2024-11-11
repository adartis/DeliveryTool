// src/components/LeftPanel.jsx
import React from 'react';

const LeftPanel = ({ onElementClick }) => {
  return (
    <div className="leftPanel">
      <button onClick={() => onElementClick('Strategy')}>Strategy</button>
      <br/>
      <button onClick={() => onElementClick('Interventions')}>Interventions</button>
      <br/>
      <button onClick={() => onElementClick('Schedule')}>Schedule</button>
      <br/>
      <button onClick={() => onElementClick('Success Metrics')}>Metrics</button>
      <br/>
      <button onClick={() => onElementClick('Risks and Issues')}>Risks and Issues</button>
      <br/>
      <button onClick={() => onElementClick('Stakeholders')}>Stakeholders</button>
    </div>
  );
};

export default LeftPanel;
