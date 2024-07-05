import React from 'react';
import { Button, useToast } from '@chakra-ui/react';

const UploadCSVButton: React.FC = () => {
    const toast = useToast();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (!file) {
            toast({
                title: "No file selected.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        // Further processing can be done here such as reading the file or sending it to a server
        toast({
            title: "File uploaded successfully.",
            description: `File Name: ${file.name}`,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <>
            <input
                type="file"
                id="csvInput"
                accept=".csv"
                hidden
                onChange={handleFileChange}
            />
            <label htmlFor="csvInput">
                <Button as="span" colorScheme="teal" size="md"  width="full">
                    Upload CSV
                </Button>
            </label>
        </>
    );
};

export default UploadCSVButton;
