import { Router } from 'express';
import { get } from '../actions/main';

const app: Router = Router();

app.get('/', get);

export default app;
