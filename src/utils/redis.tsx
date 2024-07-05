// lib/redis.js
import { createClient } from 'redis';

let client;

async function initializeRedis() {
  client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
}

initializeRedis();

export async function saveUserAddressAndTwitterID(address, twitterID) {
  if (!client) {
    await initializeRedis();
  }
  await client.set(address, twitterID);
}

export async function getUserTwitterID(address) {
  if (!client) {
    await initializeRedis();
  }
  return await client.get(address);
}

export default client;
