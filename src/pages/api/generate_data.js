import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
    const url = 'http://rnwxt-94-109-98-182.a.free.pinggy.link/generate_data';

    try {
        const response = await fetch(url, {
            method: req.method,
            headers: {
                'Content-Type': req.headers['content-type'] || 'application/json',
            },
            body: req.method === 'POST' ? req.body : undefined,
        });

        const data = await response.blob();

        res.status(response.status);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
