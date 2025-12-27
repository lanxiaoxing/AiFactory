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
  'EQUATOR25': {
    productConfig: [
      { label: 'Development', value: 'XiaMen' },
      { label: 'Platform', value: 'QC7750' },
      { label: 'Display', value: '6.7 inch POLED' },
      { label: 'Series', value: 'Moto Edge' },
      { label: 'Water Proof', value: 'IP69' },
      { label: 'Battery', value: '4800mAh' }
    ],
    keyProcess: [
      { label: 'SMT Key Process', value: '3 Mixed Pannel, Underfill' },
      { label: 'Test Key Process', value: 'FOD, LCDCAL, SOIS, SWB' },
      { label: 'Assy Key Process', value: 'Front Camera Bracket LDA，MIC LDA， Housing LDA，Inlay LDA' },
      { label: 'Package Key Process', value: 'UV Curing and Protective Film' }
    ],
    manufactureIssue: [
      {
        status: 'Issue 1',
        issueRiskStatus: 'CQA2 Motor vibration weak\nFR 0.07%（7/10000）',
        rootCause: 'Motor FPC contact abnormal',
        correctiveActions: '1. Short-term Solution: fixture improved\nAdd shims to the fixture and raise the stopper height to reduce the pressing depth.\n\n2. Long-term Solution: Process Improvement\nThe process will be modified as follows: first, assemble the coaxial cable to the USB board, then install this sub-assembly parts into the housing. (Original process: motor -> USB board -> coaxial cable).\n\nThe new fixtures arrived at 10/25. and validate ongoing. If the validation is successful, the solution will be shared with other manufacturing sites.'
      },
      {
        status: 'Issue 2',
        issueRiskStatus: 'B7-9 Battery Cover Step Difference Out of Spec\n(2nd Color) –Xinxiu\nFR 45.2%',
        rootCause: 'Bottom arc height of Xinxiu battery cover is at lower spec limit (some out-of-spec).',
        correctiveActions: '1. Supplier optimizing CNC process. Improved material under validation.'
      },
    ],
    linePlan: [
      { sites: 'WH', volume: '355 K', kd: 'PCBA + LDA', fg: '✓', smtLine: '2', beLine: '1', cfcLine: '1' },
      { sites: 'India', volume: '500 K', kd: 'PCBA', fg: '✓', smtLine: '1', beLine: '1', cfcLine: '1' },
      { sites: 'BR', volume: '50 K', kd: 'PCBA', fg: '✓', smtLine: '1', beLine: '1', cfcLine: '1' },
      { sites: 'AR', volume: '45 K', kd: 'X', fg: '✓', smtLine: '/', beLine: '1', cfcLine: '1' },
    ]
  },
  'UTAH26': {
    productConfig: [
      { label: 'Development', value: 'Chicago' },
      { label: 'Platform', value: 'QC8550' },
      { label: 'Display', value: '6.5 inch OLED' },
      { label: 'Series', value: 'Razr' },
      { label: 'Water Proof', value: 'IP52' },
      { label: 'Battery', value: '4200mAh' }
    ],
    keyProcess: [
      { label: 'SMT Key Process', value: 'High Density, PoP' },
      { label: 'Test Key Process', value: '5G MMWave, Audio' },
      { label: 'Assy Key Process', value: 'Hinge Assy, Folding Screen' },
      { label: 'Package Key Process', value: 'Premium Box' }
    ],
    manufactureIssue: [
      {
        status: 'Issue 1',
        issueRiskStatus: 'Hinge noise during folding\nFR 0.12%',
        rootCause: 'Lubrication uneven in early batches',
        correctiveActions: '1. Auto-lubrication process optimized.\n2. screening 100% of current stock.'
      }
    ],
    linePlan: [
      { sites: 'WH', volume: '200 K', kd: 'PCBA', fg: '✓', smtLine: '1', beLine: '1', cfcLine: '1' },
    ]
  },
  'MUMBAI25': {
    productConfig: [
      { label: 'Development', value: 'Beijing' },
      { label: 'Platform', value: 'MTK9200' },
      { label: 'Display', value: '6.8 inch LCD' },
      { label: 'Series', value: 'G Series' },
      { label: 'Water Proof', value: 'IP52' },
      { label: 'Battery', value: '5000mAh' }
    ],
    keyProcess: [
      { label: 'SMT Key Process', value: 'Standard SMT' },
      { label: 'Test Key Process', value: 'RF Calibration' },
      { label: 'Assy Key Process', value: 'Screw Fastening, Adhesive' },
      { label: 'Package Key Process', value: 'Standard Packaging' }
    ],
    manufactureIssue: [
      {
        status: 'Issue 1',
        issueRiskStatus: 'Camera lens dust\nFR 0.05%',
        rootCause: 'Clean room static control issue',
        correctiveActions: '1. Enhanced ionizers at assembly station.\n2. Hourly particle count monitoring.'
      },
      {
        status: 'Issue 2',
        issueRiskStatus: 'Battery cover gap\nFR 0.08%',
        rootCause: 'Adhesive curing time insufficient',
        correctiveActions: '1. Extended curing time by 10s.\n2. Added pressure fixture verification.'
      }
    ],
    linePlan: [
      { sites: 'India', volume: '800 K', kd: 'CKD', fg: '✓', smtLine: '2', beLine: '2', cfcLine: '1' },
    ]
  },
  'URUS25': {
    productConfig: [
      { label: 'Development', value: 'Wuhan' },
      { label: 'Platform', value: 'QC6450' },
      { label: 'Display', value: '6.5 inch LCD' },
      { label: 'Series', value: 'E Series' },
      { label: 'Water Proof', value: 'IP52' },
      { label: 'Battery', value: '5000mAh' }
    ],
    keyProcess: [
      { label: 'SMT Key Process', value: 'Standard SMT' },
      { label: 'Test Key Process', value: 'Basic Function Check' },
      { label: 'Assy Key Process', value: 'Snap Fit' },
      { label: 'Package Key Process', value: 'Eco Packaging' }
    ],
    manufactureIssue: [
      {
        status: 'Issue 1',
        issueRiskStatus: 'Speaker mesh deformation\nFR 0.03%',
        rootCause: 'Handling damage during sub-assy',
        correctiveActions: '1. New handling tray implemented.\n2. Operator retraining completed.'
      }
    ],
    linePlan: [
      { sites: 'BR', volume: '300 K', kd: 'CKD', fg: '✓', smtLine: '1', beLine: '1', cfcLine: '1' },
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