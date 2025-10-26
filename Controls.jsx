import React from 'react';
import { FiImage, FiZap } from 'react-icons/fi';

const Controls = ({ 
  targetSize, 
  setTargetSize, 
  selectedFormat, 
  setSelectedFormat, 
  isCompressing, 
  onCompress 
}) => {
  return (
    <div className="controls">
      <div className="control-group">
        <label>Target File Size (KB)</label>
        <input 
          type="number" 
          value={targetSize}
          onChange={(e) => setTargetSize(e.target.value)}
          min="1"
          max="10000"
          placeholder="Enter size in KB"
        />
      </div>

      <div className="control-group">
        <label>Output Format</label>
        <div className="format-options">
          <button 
            className={`format-btn ${selectedFormat === 'jpeg' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('jpeg')}
          >
            <FiImage /> JPEG
          </button>
          <button 
            className={`format-btn ${selectedFormat === 'png' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('png')}
          >
            <FiImage /> PNG
          </button>
          <button 
            className={`format-btn ${selectedFormat === 'webp' ? 'active' : ''}`}
            onClick={() => setSelectedFormat('webp')}
          >
            <FiImage /> WebP
          </button>
        </div>
      </div>

      <button 
        className={`compress-btn ${isCompressing ? 'loading' : ''}`}
        onClick={onCompress}
        disabled={isCompressing}
      >
        {isCompressing ? (
          <>
            <FiZap /> Compressing...
          </>
        ) : (
          <>
            <FiZap /> Compress Image
          </>
        )}
      </button>
    </div>
  );
};

export default Controls;
