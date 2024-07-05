// pages/api/download.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = '/home/torch/StarknetHH2024/with-chakra-ui-app/download.csv';
    const fileStream = fs.createReadStream(filePath);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=downloaded_data.csv');

  fileStream.pipe(res);
}
