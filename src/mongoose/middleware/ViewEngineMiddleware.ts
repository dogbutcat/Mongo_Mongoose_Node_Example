import * as express from 'express';
import * as path from 'path';
import * as consolidate from 'consolidate';

export class SetViewEngine{
    static handlerbars(app:express.Application,viewPath:string='views') {
        app.engine('handlebars', consolidate.handlebars);
        app.set('view engine', 'handlebars');
        app.set('views', path.resolve(process.cwd(), viewPath));
    }
}