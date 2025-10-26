import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const UploadArea = ({ fileInputRef, onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`upload-area ${dragActive ? 'drag-active' : ''}`}
      onClick={() => fileInputRef.current?.click()}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <FiUploadCloud className="upload-icon" />
      <h3>Click to upload or drag & drop</h3>
      <p>Supports JPG, PNG, WebP, BMP, GIF</p>
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UploadArea;
