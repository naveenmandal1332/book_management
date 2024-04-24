import express from 'express';
import dbConfig from './config/database.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
await dbConfig();

// Add Middleware:
app.use(express.json());

// Add Routes Files:

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
