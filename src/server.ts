import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`App Is Listening On Port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// handle unhandledRejection
process.on('unhandledRejection', () => {
  if (server) {
    server.close();
    console.error(`😈 unhandledRejection is detected , shutting down ...`);
    process.exit(1);
  }
  process.exit(1);
});

// handle uncaughtException
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
