import React from 'react';
import styles from './ProjectDetailsPopup.module.css';

interface ProjectDetailsPopupProps {
  projectName: string;
  onClose: () => void;
}

// Data Interfaces
interface ProductConfigItem {
  label: string;
  value: string;
}

interface KeyProcessItem {
  label: string;
  value: string;
}

interface ManufactureIssueItem {
  status: string;
  issueRiskStatus: string;
  rootCause: string;
  correctiveActions: string;
}

interface LinePlanItem {
  sites: string;
  volume: string;
  kd: string;
  fg: string;
  smtLine: string;
  beLine: string;
  cfcLine: string;
}

interface ProjectData {
  productConfig: ProductConfigItem[];
  keyProcess: KeyProcessItem[];
  manufactureIssue: ManufactureIssueItem[];
  linePlan: LinePlanItem[];
}

// Project specific data map
const projectsData: { [key: string]: ProjectData } = {
  'URUS25': {
    productConfig: [
      { label: 'Development', value: 'Shanghai' },
      { label: 'Platform', value: 'SM8845' },
      { label: 'Display', value: '6.7 inch POLED 3D' },
      { label: 'Series', value: 'Signature' },
      { label: 'Water Proof', value: 'IP69' },
      { label: 'Battery', value: '5200mAh' }
    ],
    keyProcess: [
      { label: 'SMT Key Process', value: '3 Mixed Pannel, Underfill' },
      { label: 'Test Key Process', value: 'FOD, TeleCal, LCDCAL, SOIS, SWB, ACT' },
      { label: 'Assy Key Process', value: 'Inlay LDA' },
      { label: 'Package Key Process', value: 'UV Curing and Protective Film, Perfume spray' }
    ],
    manufactureIssue: [],
    linePlan: [
      { sites: 'WH', volume: '134', kd: 'LDA +PCBA+XCVR', fg: '✓', smtLine: '1', beLine: '1', cfcLine: '1' },
      { sites: 'India', volume: '150', kd: 'LDA', fg: '✓', smtLine: '/', beLine: '/', cfcLine: '/' },
      { sites: 'Indonesia', volume: '10', kd: 'XCVR', fg: '✓', smtLine: '/', beLine: '/', cfcLine: '/' },
      { sites: 'BR', volume: '12', kd: 'LDA', fg: '✓', smtLine: '/', beLine: '/', cfcLine: '/' },
      { sites: 'AR', volume: '18', kd: 'PCBA+LDA', fg: '✓', smtLine: '/', beLine: '/', cfcLine: '/' },
    ]
  },
  'AVENGER26': {
    productConfig: [
      { label: 'Development', value: 'Shanghai' },
      { label: 'Platform', value: 'SM7635' },
      { label: 'Display', value: '6.7 inch POLED 3D' },
      { label: 'Series', value: 'Moto Edge' },
      { label: 'Water Proof', value: 'IP69' },
      { label: 'Battery', value: '5000mAh / 7000mAh' }
    ],
    keyProcess: [
      { label: 'SMT Key Process', value: '3 Mixed Pannel, Underfill' },
      { label: 'Test Key Process', value: 'FOD, LCDCAL, SOIS,' },
      { label: 'Assy Key Process', value: 'Inlay LDA' },
      { label: 'Package Key Process', value: 'Perfume spray' }
    ],
    manufactureIssue: [],
    linePlan: [
      { sites: 'WH', volume: '1340', kd: 'LDA+70% XCVR', fg: '✓', smtLine: '4', beLine: '6', cfcLine: '5' },
      { sites: 'India', volume: '2741', kd: 'LDA', fg: '✓', smtLine: '/', beLine: '/', cfcLine: '/' },
      { sites: 'Indonesia', volume: '25', kd: 'LDA', fg: '✓', smtLine: '/', beLine: '/', cfcLine: '/' },
      { sites: 'BR', volume: '480', kd: 'LDA', fg: '✓', smtLine: '/', beLine: '/', cfcLine: '/' },
      { sites: 'AR', volume: '166', kd: '70%XCVR', fg: '✓', smtLine: '/', beLine: '1', cfcLine: '/' },
    ]
  },
  'DALLAS26': {
    productConfig: [
      { label: 'Development', value: 'Xiamen' },
      { label: 'Platform', value: 'SM6475' },
      { label: 'Display', value: '6.7 inch POLED 2D' },
      { label: 'Series', value: 'Moto G' },
      { label: 'Water Proof', value: 'IP69' },
      { label: 'Battery', value: '5200mAh' }
    ],
    keyProcess: [
      { label: 'SMT Key Process', value: '3 Mixed Pannel, Underfill' },
      { label: 'Test Key Process', value: 'FOD, LCDCAL, SOIS,' },
      { label: 'Assy Key Process', value: 'Inlay LDA' },
      { label: 'Package Key Process', value: '/' }
    ],
    manufactureIssue: [],
    linePlan: [
      { sites: 'WH', volume: '1199', kd: 'LDA', fg: '✓', smtLine: '1', beLine: '1', cfcLine: '2' },
      { sites: 'India', volume: '480', kd: '/', fg: '✓', smtLine: '/', beLine: '/', cfcLine: '/' },
      { sites: 'BR', volume: '/', kd: '/', fg: '/', smtLine: '/', beLine: '/', cfcLine: '/' },
      { sites: 'AR', volume: '/', kd: '/', fg: '/', smtLine: '/', beLine: '/', cfcLine: '/' },
    ]
  },
  'EQUATOR25': {
    productConfig: [
      { label: 'Development', value: 'Xiamen' },
      { label: 'Platform', value: 'QC7750' },
      { label: 'Display', value: '6.7 inch POLED 2.5D' },
      { label: 'Series', value: 'Moto Edge' },
      { label: 'Water Proof', value: 'IP69' },
      { label: 'Battery', value: '4800mAh' }
    ],
    keyProcess: [
      { label: 'SMT Key Process', value: '3 Mixed Pannel, Underfill' },
      { label: 'Test Key Process', value: 'FOD, LCDCAL, SOIS, SWB' },
      { label: 'Assy Key Process', value: 'Inlay LDA' },
      { label: 'Package Key Process', value: 'UV Curing and Protective Film, Perfume spray' }
    ],
    manufactureIssue: [],
    linePlan: [
      { sites: 'WH', volume: '355 K', kd: 'PCBA + LDA', fg: '✓', smtLine: '2', beLine: '1', cfcLine: '1' },
      { sites: 'India', volume: '500 K', kd: 'PCBA', fg: '✓', smtLine: '1', beLine: '1', cfcLine: '1' },
      { sites: 'BR', volume: '50 K', kd: 'PCBA', fg: '✓', smtLine: '1', beLine: '1', cfcLine: '1' },
      { sites: 'AR', volume: '45 K', kd: 'X', fg: '✓', smtLine: '/', beLine: '1', cfcLine: '1' },
    ]
  }
};

const ProjectDetailsPopup: React.FC<ProjectDetailsPopupProps> = ({ projectName, onClose }) => {
  // Get data for the selected project, or use default empty/placeholder data if not found
  const currentProjectData = projectsData[projectName] || {
    productConfig: [],
    keyProcess: [],
    manufactureIssue: [],
    linePlan: []
  };

  const { productConfig: productConfigData, keyProcess: keyProcessData, manufactureIssue: manufactureIssueData, linePlan: linePlanData } = currentProjectData;

  // Product Config Card Component - Card-based layout
  const ProductConfigTable: React.FC<{ title: string; data: any[] }> = ({ title, data }) => {
    return (
      <div className={`${styles.moduleSection} ${styles.productConfigModule}`}>
        <div className={styles.moduleWithSidebar}>
          <div className={styles.moduleSidebar}>
            <h3 className={styles.moduleTitle}>{title}</h3>
          </div>
          <div className={styles.productConfigContent}>
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
            <div className={styles.productImageWrapper}>
              <img src="/phone.png" alt="Product" className={styles.productImage} />
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

  const ModuleTable: React.FC<{ title: string; data: any[]; headers: string[]; noHover?: boolean; customClass?: string }> = ({ title, data, headers, noHover, customClass }) => {
    // Map headers to object keys for proper data access
    const headerToKeyMap: { [key: string]: string } = {
      'Parameter': 'parameter',
      'Value': 'value',
      'Specification': 'specification',
      'Process': 'process',
      'Station': 'station',
      'Status': 'status',
      'Item': 'status',
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
      'Issue': 'issue',
      'SMT': 'smt',
      'BE': 'be',
      'CFC': 'cfc',
      'Temperature': 'temperature',
      'Issue, Risk and Status': 'issueRiskStatus',
      'Root Cause': 'rootCause',
      'Corrective Actions / Plan': 'correctiveActions',
      'Sites': 'sites',
      'Volume': 'volume',
      'KD': 'kd',
      'FG': 'fg',
      'SMT Line': 'smtLine',
      'BE Line': 'beLine',
      'CFC Line': 'cfcLine',
    };

    return (
      <div className={`${styles.moduleSection} ${noHover ? styles.noHover : ''}`}>
        <div className={styles.moduleWithSidebar}>
          <div className={styles.moduleSidebar}>
            <h3 className={styles.moduleTitle}>{title}</h3>
          </div>
          <div className={styles.tableWrapper}>
            <table className={`${styles.moduleTable} ${noHover ? styles.noHoverTable : ''} ${customClass || ''}`}>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={noHover ? styles.noHoverRow : ''}>
                    {headers.map((header, colIndex) => {
                      const key = headerToKeyMap[header];
                      const value = row[key];
                      return (
                        <td key={colIndex}>
                          {value || (key === 'issue' ? '' : '')}
                        </td>
                      );
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
            <strong>{projectName}</strong> - ROW + PRC
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
              headers={['Item', 'Issue, Risk and Status', 'Root Cause', 'Corrective Actions / Plan']}
              noHover={true}
              customClass={styles.manufactureIssueTable}
            />

            <ModuleTable
              title="Line Plan"
              data={linePlanData}
              headers={['Sites', 'Volume', 'KD', 'FG', 'SMT Line', 'BE Line', 'CFC Line']}
              customClass={styles.linePlanTable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPopup;