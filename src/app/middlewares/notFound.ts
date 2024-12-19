/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import status from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from 'express';

const notFound: RequestHandler = (req, res, next) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
};

export default notFound;
