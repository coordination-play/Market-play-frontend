// pages/api/download.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = '/Users/yash/Hackathons/StarknetBrussles2024/Market-play-frontend/Campaign_Data_beta.csv';
    const fileStream = fs.createReadStream(filePath);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=downloaded_data.csv');

  fileStream.pipe(res);
}