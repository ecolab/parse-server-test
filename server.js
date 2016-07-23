import path from 'path';
import express from 'express';
import Parse from 'parse/node';
import {
  ParseServer
}
from 'parse-server';
import parseDashboard from 'parse-dashboard';

const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 'oss-f8-app-2016';
const MASTER_KEY = process.env.MASTER_KEY ||
                  '70c6093dba5a7e55968a1c7ad3dd3e5a74ef5cac';
const DATABASE_URI = config.DATABASE_URI || process.env.DATABASE_URI || 'mongodb://localhost:27017/dev';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH || config.DASHBOARD_AUTH;

Parse.initialize(APP_ID);
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;
Parse.masterKey = MASTER_KEY;
Parse.Cloud.useMasterKey();

const server = express();

server.use(
  '/parse',
  new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, 'Cloud.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    fileKey: 'f33fc1a9-9ba9-4589-95ca-9976c0d52cd5',
    serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`
  })
);

if (IS_DEVELOPMENT) {
  let users;
  if (DASHBOARD_AUTH) {
    var [user, pass] = DASHBOARD_AUTH.split(':');
    users = [{
      user,
      pass
    }];
  }
  server.use(
    '/dashboard',
    parseDashboard({
      apps: [{
        serverURL: '/parse',
        appId: APP_ID,
        masterKey: MASTER_KEY,
        appName: 'Parse Server'
      }],
      users
    }, IS_DEVELOPMENT)
  );
}

server.listen(SERVER_PORT, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${SERVER_PORT}`
));

// require('./Queries');
require('./Users');
// require('./Roles');
// require('./Relations');
