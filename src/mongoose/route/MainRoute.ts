import * as express from 'express';
import { RestaurantRoute } from './RestaurantRoute';

export class MainRoute{
    get route() {
        var app = express();
        app.use(new RestaurantRoute().route);
        return app;
    }
}
