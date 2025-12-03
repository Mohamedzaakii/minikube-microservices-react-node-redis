const express = require('express');
const redis = require('redis');
const app = express();
const port = process.env.PORT || 4000;

const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = process.env.REDIS_PORT || 6379;
const redisPassword = process.env.REDIS_PASSWORD || '';

const client = redis.createClient({
  socket: { host: redisHost, port: redisPort },
  password: redisPassword || undefined
});

client.connect().catch(err => console.error('Redis connect error', err));

app.get('/health', (req, res) => res.send('OK'));

app.get('/api/time', async (req, res) => {
  try {
    const cached = await client.get('time');
    if (cached) return res.json({ fromCache: true, value: cached });
    const now = new Date().toISOString();
    await client.setEx('time', 10, now);
    res.json({ fromCache: false, value: now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'redis error', details: String(err) });
  }
});

app.listen(port, () => console.log(`Backend listening on ${port}`));
