import React from 'react';
import { FiImage, FiCheck, FiDownload, FiRefreshCw } from 'react-icons/fi';

const PreviewArea = ({ 
  originalPreview, 
  originalInfo, 
  compressedPreview, 
  compressedInfo, 
  onDownload, 
  onReset,
  formatFileSize 
}) => {
  return (
    <div className="preview-area">
      <div className="preview-grid">
        <div className="preview-card">
          <h3><FiImage /> Original Image</h3>
          <img 
            className="preview-img" 
            src={originalPreview} 
            alt="Original"
          />
          {originalInfo && (
            <>
              <div className="info-item">
                <span>Size:</span>
                <strong>{formatFileSize(originalInfo.size)}</strong>
              </div>
              <div className="info-item">
                <span>Dimensions:</span>
                <strong>{originalInfo.width} x {originalInfo.height}</strong>
              </div>
              <div className="info-item">
                <span>Format:</span>
                <strong>{originalInfo.format}</strong>
              </div>
            </>
          )}
        </div>

        <div className="preview-card">
          <h3><FiCheck /> Compressed Image</h3>
          <img 
            className="preview-img" 
            src={compressedPreview} 
            alt="Compressed"
          />
          {compressedInfo && (
            <>
              <div className="info-item">
                <span>Size:</span>
                <strong>{formatFileSize(compressedInfo.size)}</strong>
              </div>
              <div className="info-item">
                <span>Dimensions:</span>
                <strong>{compressedInfo.width} x {compressedInfo.height}</strong>
              </div>
              <div className="info-item">
                <span>Format:</span>
                <strong>{compressedInfo.format}</strong>
              </div>
              <div className="info-item">
                <span>Reduction:</span>
                <strong>{compressedInfo.reduction}%</strong>
              </div>
            </>
          )}
          <button className="download-btn" onClick={onDownload}>
            <FiDownload /> Download Compressed Image
          </button>
        </div>
      </div>
      <button className="reset-btn" onClick={onReset}>
        <FiRefreshCw /> Compress Another Image
      </button>
    </div>
  );
};

export default PreviewArea;
