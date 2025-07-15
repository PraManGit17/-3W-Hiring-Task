

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import userRoutes from './routes/userRoutes.js';
// import claimRoutes from './routes/claimRoutes.js';


// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/users', userRoutes);
// app.use('/api/claim', claimRoutes);




// const PORT= process.env.PORT || 5000;
// app.listen(PORT, () => console.log(
//   `Server Running Successfully on PORT: ${PORT}`));

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import claimRoutes from './routes/claimRoutes.js';

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Init express app
const app = express();

// CORS setup
const allowedOrigins = [
  'http://localhost:3000',
  'https://3-w-hiring-task.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
