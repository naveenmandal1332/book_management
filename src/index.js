import express from 'express';
import dbConfig from './config/database.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
await dbConfig();

// Add Middleware:
app.use(express.json());
app.use(cookieParser());

// Add Routes Files:
import user from './routes/userRoutes.js';
import book from './routes/bookRoutes.js';

// Routes Middleware:
app.use('/api', user);
app.use('/api', book);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
