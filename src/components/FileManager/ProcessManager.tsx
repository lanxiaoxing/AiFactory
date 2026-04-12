import React, { useState } from 'react';
import styles from './FileManager.module.css';

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'excel' | 'other';
  size: string;
  lastModified: string;
  url?: string;
}

interface ProcessManagerProps {
  countryName: string;
  onClose: () => void;
}

const ProcessManager: React.FC<ProcessManagerProps> = ({ countryName, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(true);
  const [activeNode, setActiveNode] = useState('SMT');

  const processFiles: FileItem[] = [
    {
      id: '1',
      name: 'PTSN PCBA Transfer back to WHSC Process.xlsx',
      type: 'excel',
      size: '2.2 MB',
      lastModified: '2025-03-10',
      url: '#'
    },
    {
      id: '2',
      name: 'WHSC XCVR Transfer to PTSN Process.xlsx',
      type: 'excel',
      size: '1.5 MB',
      lastModified: '2025-02-08',
      url: '#'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'image': return '🖼️';
      case 'doc': return '📝';
      case 'excel': return '📊';
      default: return '📁';
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf': return '#e74c3c';
      case 'image': return '#3498db';
      case 'doc': return '#2ecc71';
      case 'excel': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const filteredFiles = processFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file);
  };

  const handleDownload = (file: FileItem) => {
    console.log(`Downloading ${file.name}`);
  };

  return (
    <div className={styles.fileManagerOverlay} onClick={onClose}>
      <div className={styles.fileManager} onClick={(e) => e.stopPropagation()}>
        <div className={styles.fileManagerHeader}>
          <div className={styles.headerLeft}>
            <h3>⚙️ Process - {countryName}</h3>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Search process files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.fileManagerContent}>
          <div className={styles.treeSidebar}>
            <div className={styles.treeNode}>
              <div 
                className={styles.treeNodeHeader} 
                onClick={() => setExpanded(!expanded)}
              >
                <svg className={`${styles.chevron} ${expanded ? styles.expanded : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                <svg className={styles.treeIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {expanded ? (
                    <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path>
                  ) : (
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  )}
                </svg>
                <span className={styles.treeLabel}>MFG Process</span>
              </div>
              {expanded && (
                <div className={styles.treeChildren}>
                  <div 
                    className={`${styles.treeChild} ${activeNode === 'SMT' ? styles.active : ''}`}
                    onClick={() => setActiveNode('SMT')}
                  >
                    <svg className={styles.treeIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {activeNode === 'SMT' ? (
                        <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path>
                      ) : (
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                      )}
                    </svg>
                    <span className={styles.treeLabel}>SMT</span>
                  </div>
                  <div 
                    className={`${styles.treeChild} ${activeNode === 'LDA' ? styles.active : ''}`}
                    onClick={() => setActiveNode('LDA')}
                  >
                    <svg className={styles.treeIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {activeNode === 'LDA' ? (
                        <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path>
                      ) : (
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                      )}
                    </svg>
                    <span className={styles.treeLabel}>LDA</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.fileList}>
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={styles.fileItem}
                onClick={() => handleFileClick(file)}
                style={{ '--file-color': getFileColor(file.type) } as React.CSSProperties}
              >
                <div className={styles.fileIcon}>
                  {getFileIcon(file.type)}
                </div>
                <div className={styles.fileInfo}>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileMeta}>
                    {file.size} • {file.lastModified}
                  </div>
                </div>
                <div className={styles.fileActions}>
                  <button
                    className={styles.downloadBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file);
                    }}
                  >
                    ⬇️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedFile && (
            <div className={styles.filePreview}>
              <div className={styles.previewHeader}>
                <h4>{selectedFile.name}</h4>
                <button
                  className={styles.closePreview}
                  onClick={() => setSelectedFile(null)}
                >
                  ×
                </button>
              </div>
              <div className={styles.previewContent}>
                {selectedFile.type === 'image' ? (
                  <div className={styles.imagePreview}>
                    <div className={styles.placeholderContent}>
                      <div className={styles.placeholderIcon}>🖼️</div>
                      <p>Image Preview</p>
                      <p className={styles.placeholderText}>
                        {selectedFile.name}
                      </p>
                      <button
                        className={styles.viewFullBtn}
                        onClick={() => console.log('View full image')}
                      >
                        View Full Size
                      </button>
                    </div>
                  </div>
                ) : selectedFile.type === 'pdf' ? (
                  <div className={styles.pdfPreview}>
                    <div className={styles.placeholderContent}>
                      <div className={styles.placeholderIcon}>📄</div>
                      <p>PDF Document</p>
                      <p className={styles.placeholderText}>
                        {selectedFile.name}
                      </p>
                      <button
                        className={styles.viewFullBtn}
                        onClick={() => console.log('View PDF')}
                      >
                        Open PDF Viewer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.genericPreview}>
                    <div className={styles.placeholderContent}>
                      <div className={styles.placeholderIcon}>
                        {getFileIcon(selectedFile.type)}
                      </div>
                      <p>Process Document</p>
                      <p className={styles.placeholderText}>
                        {selectedFile.name}
                      </p>
                      <p className={styles.fileDetails}>
                        Size: {selectedFile.size}<br />
                        Modified: {selectedFile.lastModified}
                      </p>
                      <button
                        className={styles.downloadFullBtn}
                        onClick={() => handleDownload(selectedFile)}
                      >
                        Download File
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessManager;