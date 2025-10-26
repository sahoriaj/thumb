export const compressToSize = (img, targetSizeBytes, format) => {
  return new Promise((resolve) => {
    const mimeType = format === 'png' ? 'image/png' : 
                   format === 'webp' ? 'image/webp' : 'image/jpeg';

    let quality = 0.9;
    let scale = 1.0;
    let attempts = 0;
    const maxAttempts = 20;

    const tryCompress = () => {
      if (attempts >= maxAttempts) {
        finalCompress();
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      
      canvas.width = w;
      canvas.height = h;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }

        if (blob.size <= targetSizeBytes) {
          resolve({ blob, width: w, height: h });
          return;
        }

        attempts++;

        const ratio = blob.size / targetSizeBytes;
        if (ratio > 2) {
          scale *= 0.8;
          quality -= 0.1;
        } else if (ratio > 1.5) {
          scale *= 0.9;
          quality -= 0.08;
        } else {
          quality -= 0.05;
        }

        quality = Math.max(0.05, quality);
        scale = Math.max(0.1, scale);

        setTimeout(tryCompress, 10);
      }, mimeType, quality);
    };

    const finalCompress = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      
      canvas.width = w;
      canvas.height = h;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      
      canvas.toBlob((blob) => {
        resolve(blob ? { blob, width: w, height: h } : null);
      }, mimeType, quality);
    };

    tryCompress();
  });
};

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};
