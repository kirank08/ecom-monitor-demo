// backend/server.js
const express = require('express');
const client = require('prom-client');

const app = express();
app.use(express.json());

const register = client.register;
client.collectDefaultMetrics({ timeout: 5000 });

const httpReqs = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method','path','status']
});

app.use((req, res, next) => {
  res.on('finish', () => {
    httpReqs.labels(req.method, req.path, String(res.statusCode)).inc();
  });
  next();
});

const products = [
  { id: 1, name: 'T-Shirt', price: 299 },
  { id: 2, name: 'Mug', price: 149 },
  { id: 3, name: 'Sticker', price: 49 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/cart', (req, res) => {
  res.json({ ok: true, cart: req.body });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
