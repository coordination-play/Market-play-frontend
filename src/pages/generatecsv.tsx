import React from 'react';
import { Button, Center } from '@chakra-ui/react';

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

  return (
    <Center>
      <Button colorScheme="blue" onClick={handleDownload} top={50} left={50} right={50}>
        Download CSV
      </Button>
    </Center>
  );
};

export default DownloadLocalCSVButton;
