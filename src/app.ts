import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as Knex from 'knex';
import * as logger from 'morgan';
import { Model } from 'objection';
import { BAD_REQUEST_STATUS, INTERNAL_SERVER_ERROR_STATUS } from './constants';
import { HttpError, HttpValidationError } from './errors';
import * as knexConfig from './knexfile';
import router from './routes';

const app: express.Express = express();

const knex = Knex(knexConfig);
Model.knex(knex);

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('[:date[iso]] :method :url :status - :response-time ms'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new HttpError('Not Found');
  err.status = 404;
  next(err);
});

app.use((error: Error, req, res, next) => {
  if (error instanceof HttpValidationError) {
    return res.json(BAD_REQUEST_STATUS, {
      status: BAD_REQUEST_STATUS,
      errors: error.errors,
    });
  }
  next(error);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((error: Error, req, res, next) => {
    res.json(error.status || INTERNAL_SERVER_ERROR_STATUS, {
      status: error.status || INTERNAL_SERVER_ERROR_STATUS,
      error: error.message,
      stack: error.stack,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  return res.json(error.status || INTERNAL_SERVER_ERROR_STATUS, {
    status: error.status || INTERNAL_SERVER_ERROR_STATUS,
    error: error.message,
  });
});

export default app;
