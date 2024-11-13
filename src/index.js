import express from 'express';
import initRoutes from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// init routes
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Access server at http://localhost:${port}`);
});

