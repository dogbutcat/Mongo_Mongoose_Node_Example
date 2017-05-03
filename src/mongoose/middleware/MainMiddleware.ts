import * as express from 'express';
import * as BodyParser from 'body-parser';
import { MainRoute } from '../route/MainRoute';
import { SetViewEngine } from './ViewEngineMiddleware';

export class MainMiddleware{
    static get Configuration() {
        var app = express();
        app.use(BodyParser.json());
        app.use(new MainRoute().route);
        return app;
    }
}