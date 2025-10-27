import React from 'react';
import styles from './ProjectDetailsPopup.module.css';

interface ProjectDetailsPopupProps {
  projectName: string;
  onClose: () => void;
}

const ProjectDetailsPopup: React.FC<ProjectDetailsPopupProps> = ({ projectName, onClose }) => {
  // Sample data for each module
  const basicInformationData = [
    { parameter: 'Product Name', value: 'EQUATOR25 Battery Cell', specification: 'High-energy density lithium-ion', process: '', station: '', status: '', efficiency: '', output: '', category: '', description: '', frequency: '', impact: '', resolution: '', line: '', capacity: '', current: '', utilization: '' },
    { parameter: 'Capacity', value: '3500 mAh', specification: 'Nominal capacity at 0.2C', process: '', station: '', status: '', efficiency: '', output: '', category: '', description: '', frequency: '', impact: '', resolution: '', line: '', capacity: '', current: '', utilization: '' },
    { parameter: 'Voltage', value: '3.7V', specification: 'Nominal voltage', process: '', station: '', status: '', efficiency: '', output: '', category: '', description: '', frequency: '', impact: '', resolution: '', line: '', capacity: '', current: '', utilization: '' },
    { parameter: 'Energy Density', value: '260 Wh/kg', specification: 'Gravimetric energy density', process: '', station: '', status: '', efficiency: '', output: '', category: '', description: '', frequency: '', impact: '', resolution: '', line: '', capacity: '', current: '', utilization: '' },
  ];

  const keyProcessData = [
    { process: 'SMT', station: 'Surface Mount Technology', status: 'Operational', efficiency: '98.5%', output: '12K units/day', parameter: '', value: '', specification: '', category: '', description: '', frequency: '', impact: '', resolution: '', line: '', capacity: '', current: '', utilization: '' },
    { process: 'BE', station: 'Battery Electrode Formation', status: 'Optimization', efficiency: '96.2%', output: '8K units/day', parameter: '', value: '', specification: '', category: '', description: '', frequency: '', impact: '', resolution: '', line: '', capacity: '', current: '', utilization: '' },
    { process: 'CFC', station: 'Cell Final Configuration', status: 'Under Upgrade', efficiency: '94.8%', output: '10K units/day', parameter: '', value: '', specification: '', category: '', description: '', frequency: '', impact: '', resolution: '', line: '', capacity: '', current: '', utilization: '' },
    { process: 'Welding', station: 'Ultrasonic Welding', status: 'Operational', efficiency: '97.1%', output: '15K units/day', parameter: '', value: '', specification: '', category: '', description: '', frequency: '', impact: '', resolution: '', line: '', capacity: '', current: '', utilization: '' },
  ];

  const manufactureIssueData = [
    { category: 'SMT Issue', description: 'Component alignment drift', frequency: 'Medium', impact: '2-3% yield loss', resolution: 'Calibration scheduled', parameter: '', value: '', specification: '', process: '', station: '', status: '', efficiency: '', output: '', line: '', capacity: '', current: '', utilization: '' },
    { category: 'BE Issue', description: 'Electrode coating uniformity', frequency: 'Low', impact: '1% quality variance', resolution: 'Process optimization', parameter: '', value: '', specification: '', process: '', station: '', status: '', efficiency: '', output: '', line: '', capacity: '', current: '', utilization: '' },
    { category: 'CFC Issue', description: 'Sealing integrity problems', frequency: 'High', impact: '5% rework rate', resolution: 'Equipment upgrade', parameter: '', value: '', specification: '', process: '', station: '', status: '', efficiency: '', output: '', line: '', capacity: '', current: '', utilization: '' },
    { category: 'Temperature', description: 'Thermal management inconsistency', frequency: 'Medium', impact: '3% performance variance', resolution: 'New cooling system', parameter: '', value: '', specification: '', process: '', station: '', status: '', efficiency: '', output: '', line: '', capacity: '', current: '', utilization: '' },
  ];

  const linePlanData = [
    { line: 'Line 1', capacity: '5000 units/day', current: '4500 units', utilization: '90%', status: 'Active', parameter: '', value: '', specification: '', process: '', station: '', efficiency: '', output: '', category: '', description: '', frequency: '', impact: '', resolution: '' },
    { line: 'Line 2', capacity: '6000 units/day', current: '5200 units', utilization: '87%', status: 'Active', parameter: '', value: '', specification: '', process: '', station: '', efficiency: '', output: '', category: '', description: '', frequency: '', impact: '', resolution: '' },
    { line: 'Line 3', capacity: '4500 units/day', current: '0 units', utilization: '0%', status: 'Maintenance', parameter: '', value: '', specification: '', process: '', station: '', efficiency: '', output: '', category: '', description: '', frequency: '', impact: '', resolution: '' },
    { line: 'Line 4', capacity: '5500 units/day', current: '4800 units', utilization: '87%', status: 'Active', parameter: '', value: '', specification: '', process: '', station: '', efficiency: '', output: '', category: '', description: '', frequency: '', impact: '', resolution: '' },
  ];

  const ModuleTable: React.FC<{ title: string; data: any[]; headers: string[] }> = ({ title, data, headers }) => {
    // Map headers to object keys for proper data access
    const headerToKeyMap: { [key: string]: string } = {
      'Parameter': 'parameter',
      'Value': 'value',
      'Specification': 'specification',
      'Process': 'process',
      'Station': 'station',
      'Status': 'status',
      'Efficiency': 'efficiency',
      'Output': 'output',
      'Category': 'category',
      'Description': 'description',
      'Frequency': 'frequency',
      'Impact': 'impact',
      'Resolution': 'resolution',
      'Line': 'line',
      'Capacity': 'capacity',
      'Current': 'current',
      'Utilization': 'utilization',
    };

    return (
      <div className={styles.moduleSection}>
        <div className={styles.moduleWithSidebar}>
          <div className={styles.moduleSidebar}>
            <h3 className={styles.moduleTitle}>{title}</h3>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.moduleTable}>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, colIndex) => {
                      const key = headerToKeyMap[header];
                      return <td key={colIndex}>{row[key]}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <strong>{projectName}</strong> - Project Details
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.modulesGrid}>
            <ModuleTable
              title="Product Config"
              data={basicInformationData}
              headers={['Parameter', 'Value', 'Specification']}
            />

            <ModuleTable
              title="Key Process"
              data={keyProcessData}
              headers={['Process', 'Station', 'Status', 'Efficiency', 'Output']}
            />

            <ModuleTable
              title="Manufacture Issue"
              data={manufactureIssueData}
              headers={['Category', 'Description', 'Frequency', 'Impact', 'Resolution']}
            />

            <ModuleTable
              title="Line Plan"
              data={linePlanData}
              headers={['Line', 'Capacity', 'Current', 'Utilization', 'Status']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPopup;