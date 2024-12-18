import express, { Request, Response } from 'express';
import cors from 'cors';
import status from "http-status";

const app = express();

// Enable CORS for cross-origin requests
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(status.OK).json({
        success: true,
        message: 'Blog Website Server Is Running',
    })
})

export default app;