import { Button } from '@chakra-ui/react';
import React from 'react';

interface PostDataProps {
    campaignStart: number;
    campaignEnd: number;
    viewExponent: number;
    minFollowers: number;
    minImpressions: number;
    maxMentions: number;
    targetUserId: number;
}

const DownloadDataButton: React.FC<PostDataProps> = ({
    campaignStart,
    campaignEnd,
    viewExponent,
    minFollowers,
    minImpressions,
    maxMentions,
    targetUserId
}) => {
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('campaign_start', campaignStart.toString());
        formData.append('campaign_end', campaignEnd.toString());
        formData.append('view_exponent', viewExponent.toString());
        formData.append('min_followers', minFollowers.toString());
        formData.append('min_impressions', minImpressions.toString());
        formData.append('max_mentions', maxMentions.toString());
        formData.append('target_user_id', targetUserId.toString());

        try {
            const response = await fetch('http://rnonk-217-111-230-50.a.free.pinggy.link/generate_data', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "downloaded_data.csv";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <Button colorScheme={"teal"} onClick={handleSubmit}>Download CSV Data</Button>;
};

export default DownloadDataButton;
