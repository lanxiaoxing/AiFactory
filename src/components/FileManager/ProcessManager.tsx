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