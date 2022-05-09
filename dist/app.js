import express from 'express';
import indexRoute from './routes/index.js';
const app = express();
app.use('/', indexRoute);
app.set('port', process.env.PORT || 4000);
const server = app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${server.address().port}`);
});
