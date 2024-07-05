import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 10000, // Increase the timeout to 10 seconds
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function initializeRedis() {
  if (!client.isOpen) {
    await client.connect();
    console.log('Redis client connected');
  }
}

initializeRedis();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { address, twitterID } = req.body;

    try {
      await client.set(address, twitterID);
      console.log(`Saved address: ${address}, Twitter ID: ${twitterID}`);
      setTimeout(async () => {
        await client.quit(); // Close the connection after 5 seconds
        console.log('Redis connection closed');
      }, 5000);
      res.status(200).json({ message: 'Success' });
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ error: 'Error saving data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
