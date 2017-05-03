import * as express from 'express';
import { RestaurantController } from '../controller/RestaurantController';

export class RestaurantRoute{
    private _controller: RestaurantController;
    constructor() {
        this._controller = new RestaurantController();
    }
    get route() {
        var router = express.Router();
        var controller = this._controller;
        router.get('/restaurants', controller.retrieve);
        router.post('/restaurants', controller.create);
        router.put('/restaurants/:_id', controller.update);
        router.get('/restaurants/:_id', controller.findById);
        router.delete('/restaurants/:_id', controller.delete);
        return router;
    }
}