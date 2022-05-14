import express, { Express, Request, Response } from 'express';
import { AddressInfo } from "net";
import cors from 'cors'

import indexRoute from './routes/index.js';

const app: Express = express();
app.use(cors());

app.use('/', indexRoute);


app.set('port', process.env.PORT || 4000);

const server = app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});