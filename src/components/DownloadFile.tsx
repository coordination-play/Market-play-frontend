import React from 'react';

const DownloadLocalCSVButton: React.FC = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download'); 
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded_data.csv';
      
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleDownload}>Download CSV</button>;
};

export default DownloadLocalCSVButton;
