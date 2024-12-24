// backend/server.js
const express = require('express');
const cors = require('cors');
const dishRoutes = require('./routes/dishRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tableRoutes = require('./routes/tableRoutes');
const qrRoutes = require('./routes/qrRoutes');

// (Mới) import userRoutes
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// (MỚI) Định nghĩa route login
// => lúc gọi sẽ là POST http://localhost:5000/api/login
app.use('/api', userRoutes);

// Các route cũ
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/qr', qrRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});