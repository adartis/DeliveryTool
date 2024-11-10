// src/components/MiddlePanel.jsx
import React from 'react';
import Strategy from './elementStrategy';
import Interventions from './elementInterventions';
import Schedule from './elementSchedule';
import SuccessMetrics from './elementMetrics';
import RisksAndIssues from './elementRisksAndIssues';
import Stakeholders from './elementStakeholders';

const MiddlePanel = ({ activeElement }) => {
  const renderContent = () => {
    switch (activeElement) {
      case 'Strategy':
        return <Strategy />;
      case 'Interventions':
        return <Interventions />;
      case 'Schedule':
        return <Schedule />;
      case 'Success Metrics':
        return <SuccessMetrics />;
      case 'Risks and Issues':
        return <RisksAndIssues />;
      case 'Stakeholders':
        return <Stakeholders />;
      default:
        return <p>Please select an option from the left panel.</p>;
    }
  };

  return (
    <div className="middlePanel">
      {renderContent()}
    </div>
  );
};

export default MiddlePanel;
