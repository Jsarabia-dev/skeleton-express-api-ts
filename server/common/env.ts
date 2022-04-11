import dotenv from 'dotenv';

dotenv.config();

const requiredVariables = [
  // 'APP_ID',
  'PORT',
  // 'LOG_LEVEL',
  // 'REQUEST_LIMIT',
  // 'SESSION_SECRET',
  // 'OPENAPI_SPEC',
  'MONGO_HOST',
];

requiredVariables.forEach((envVariable) => {
  if (!process.env[envVariable]) {
    // console.log(requiredVariables[i], process.env[envVariable]);
    throw new Error(`The env variables ${envVariable} is not set`);
  }
});

const config = {};

export = config;
