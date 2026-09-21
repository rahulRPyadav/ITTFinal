const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Universal CORS Fix (No Wildcard Route Crash)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 1-Click First Admin Account Creation Route
app.get('/api/create-admin-now', async (req, res) => {
  try {
    const adminEmail = 'ishika.travels4379@gmail.com';
    const adminPassword = 'Admin@1234';

    await User.deleteMany({ email: adminEmail });
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: 'Ishika Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    res.send(`✅ Admin Created in Atlas! Email: ${adminEmail} | Password: ${adminPassword}`);
  } catch (err) {
    res.status(500).send("Database Error: " + err.message);
  }
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Ishika Tour & Travels API is Live & Running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});