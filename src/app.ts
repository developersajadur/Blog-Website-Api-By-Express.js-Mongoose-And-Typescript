import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import status from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Enable CORS for cross-origin requests
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    message: 'Blog Website Server Is Running',
  });
});

// middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
