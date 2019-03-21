import { Router } from 'express';
import PromiseRouter from 'express-promise-router';
import * as expressValidator from 'express-validator';
import { auth as authAction } from '../actions/auth/auth';
import { get as mainAction } from '../actions/main';
import { get as privateAction } from '../actions/private';
import authMiddleware from '../middlewares/auth';
import validationMiddleware from '../middlewares/validation';
import PostAuthRequest from '../requests/auth/auth';
import expressValidationOptions from '../requests/options';

const app: Router = PromiseRouter();

app.use(expressValidator(expressValidationOptions));
app.get('/', mainAction);
app.post('/auth', validationMiddleware(PostAuthRequest), authAction);
app.get('/private', authMiddleware, privateAction);

export default app;
