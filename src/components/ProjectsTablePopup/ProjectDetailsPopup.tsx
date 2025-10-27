import React from 'react';
import styles from './ProjectDetailsPopup.module.css';

interface ProjectDetailsPopupProps {
  projectName: string;
  onClose: () => void;
}

const ProjectDetailsPopup: React.FC<ProjectDetailsPopupProps> = ({ projectName, onClose }) => {
  // Product Config data - 3x2 table layout
  const productConfigData = [
    { label: 'Development', value: 'XiaMen' },
    { label: 'Platform', value: 'QC7750' },
    { label: 'Display', value: '6.7 inch POLED' },
    { label: 'Series', value: 'Moto Edge' },
    { label: 'Water Proof', value: 'IP69' },
    { label: 'Battery', value: '4800mAh' }
  ];

  // Key Process info - 2-column table layout
  const keyProcessData = [
    { label: 'SMT Key Process', value: '3 Mixed Pannel Underfill' },
    { label: 'Test Key Process', value: 'FOD, LCDCAL, SOIS, SWB' },
    { label: 'Assy Key Process', value: 'Front Camera Bracket LDA，MIC LDA， Housing LDA，Inlay LDA' },
    { label: 'Package Key Process', value: 'UV Curing and Protective Film' }
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

  // Product Config Card Component - Card-based layout
  const ProductConfigTable: React.FC<{ title: string; data: any[] }> = ({ title, data }) => {
    return (
      <div className={styles.moduleSection}>
        <div className={styles.moduleWithSidebar}>
          <div className={styles.moduleSidebar}>
            <h3 className={styles.moduleTitle}>{title}</h3>
          </div>
          <div className={styles.configCardsWrapper}>
            <div className={styles.configCardsGrid}>
              {data.map((item, index) => (
                <div key={index} className={styles.configCard}>
                  <div className={styles.configCardLabel}>{item.label}</div>
                  <div className={styles.configCardValue}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Key Process Table Component - 2-column table layout
  const ProductConfigInfo: React.FC<{ title: string; data: any[] }> = ({ title, data }) => {
    return (
      <div className={`${styles.moduleSection} ${styles.keyProcessModule}`}>
        <div className={styles.moduleWithSidebar}>
          <div className={styles.moduleSidebar}>
            <h3 className={styles.moduleTitle}>{title}</h3>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.keyProcessTable}>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className={styles.configLabel}>{row.label}</td>
                    <td className={styles.configValue}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

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
            <ProductConfigTable
              title="Product Config"
              data={productConfigData}
            />

            <ProductConfigInfo
              title="Key Process"
              data={keyProcessData}
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