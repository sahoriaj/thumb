import React, { useState, useEffect, useRef } from 'react';
import Navigation from './Navigation';
import UploadArea from './UploadArea';
import Controls from './Controls';
import PreviewArea from './PreviewArea';
import Footer from './Footer';
import { compressToSize, formatFileSize } from './utils';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [originalFile, setOriginalFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [originalInfo, setOriginalInfo] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [compressedPreview, setCompressedPreview] = useState(null);
  const [compressedInfo, setCompressedInfo] = useState(null);
  const [targetSize, setTargetSize] = useState(50);
  const [selectedFormat, setSelectedFormat] = useState('jpeg');
  const [isCompressing, setIsCompressing] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [showControls, setShowControls] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }

    document.title = 'Smart Image Compressor - Compress Images Online Free';
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setStatus({ message: 'Please select a valid image file', type: 'error' });
      return;
    }

    setOriginalFile(file);
    setShowControls(true);
    setShowPreview(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setOriginalPreview(dataUrl);

      const img = new Image();
      img.onload = () => {
        setOriginalInfo({
          size: file.size,
          width: img.width,
          height: img.height,
          format: file.type.split('/')[1].toUpperCase()
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);

    setStatus({ message: 'Image loaded! Set target size and compress.', type: 'success' });
  };

  const handleCompress = async () => {
    if (!originalFile || !originalPreview) {
      setStatus({ message: 'Please upload an image first', type: 'error' });
      return;
    }

    if (!targetSize || targetSize < 1) {
      setStatus({ message: 'Please enter a valid target size', type: 'error' });
      return;
    }

    setIsCompressing(true);
    setStatus({ message: 'Compressing image...', type: 'processing' });

    try {
      const img = new Image();
      img.src = originalPreview;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const targetSizeBytes = targetSize * 1024;
      const result = await compressToSize(img, targetSizeBytes, selectedFormat);
      
      if (!result) {
        throw new Error('Compression failed');
      }

      setCompressedBlob(result.blob);
      const compressedUrl = URL.createObjectURL(result.blob);
      setCompressedPreview(compressedUrl);

      setCompressedInfo({
        size: result.blob.size,
        width: result.width,
        height: result.height,
        format: selectedFormat.toUpperCase(),
        reduction: ((1 - result.blob.size / originalFile.size) * 100).toFixed(1)
      });

      setShowPreview(true);
      
      if (result.blob.size <= targetSizeBytes) {
        setStatus({ 
          message: `✓ Success! Compressed to ${formatFileSize(result.blob.size)}`, 
          type: 'success' 
        });
      } else {
        setStatus({ 
          message: `Compressed to ${formatFileSize(result.blob.size)} (best possible)`, 
          type: 'success' 
        });
      }

    } catch (error) {
      setStatus({ message: 'Error: ' + error.message, type: 'error' });
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob) return;

    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    const ext = selectedFormat === 'jpeg' ? 'jpg' : selectedFormat;
    a.href = url;
    a.download = `compressed_${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setOriginalInfo(null);
    setCompressedBlob(null);
    setCompressedPreview(null);
    setCompressedInfo(null);
    setShowControls(false);
    setShowPreview(false);
    setStatus({ message: '', type: '' });
    setTargetSize(50);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main>
        <div className="ad-container ad-top">
          <script type="text/javascript">
	atOptions = {
		'key' : '17bc7dfbc62fed0d61403b979d078ead',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//financialwagerepel.com/17bc7dfbc62fed0d61403b979d078ead/invoke.js"></script>
        </div>

        <div className="content-wrapper">
          <div className="tool-container">
            <h1>🖼️ Smart Image Compressor</h1>
            <p className="subtitle">Compress images to exact size with format conversion</p>

            <UploadArea 
              fileInputRef={fileInputRef}
              onFileSelect={handleFile}
            />

            {showControls && (
              <Controls
                targetSize={targetSize}
                setTargetSize={setTargetSize}
                selectedFormat={selectedFormat}
                setSelectedFormat={setSelectedFormat}
                isCompressing={isCompressing}
                onCompress={handleCompress}
              />
            )}

            {showPreview && (
              <PreviewArea
                originalPreview={originalPreview}
                originalInfo={originalInfo}
                compressedPreview={compressedPreview}
                compressedInfo={compressedInfo}
                onDownload={handleDownload}
                onReset={handleReset}
                formatFileSize={formatFileSize}
              />
            )}

            {status.message && (
              <div className={`status ${status.type}`}>
                {status.message}
              </div>
            )}

            <div className="ad-container" style={{ marginTop: '30px' }}>
              <script type="text/javascript">
	atOptions = {
		'key' : '17bc7dfbc62fed0d61403b979d078ead',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//financialwagerepel.com/17bc7dfbc62fed0d61403b979d078ead/invoke.js"></script>
            </div>
          </div>

          <div className="ad-sidebar">
            <div className="ad-container">
              <script type="text/javascript">
	atOptions = {
		'key' : 'b69551af66b76fd516108721fb822277',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//financialwagerepel.com/b69551af66b76fd516108721fb822277/invoke.js"></script>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
