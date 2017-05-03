
import { BaseController } from './BaseController';
import { RestaurantBusiness } from '../business/RestaurantBusiness';
import * as express from 'express';
import { RestaurantDoc } from '../model/Restaurant';

/**
 * Do what express Request function will deal with
 */
export class RestaurantController implements BaseController<RestaurantBusiness>{
	constructor() { }
	create(req: express.Request, res: express.Response) {
		try {
			var _doc = <RestaurantDoc>req.body;
			var restaurantBusiness = new RestaurantBusiness();
			restaurantBusiness.create(_doc, (err, result) => {
				if (err) res.render('index', { "result": "error" });
				else res.render('index', { "result": "success" });
			});
		} catch (e) {
			console.error(e);
			res.send({ 'error': 'error in your request' })
		}
	}
	update(req: express.Request, res: express.Response) {
		try {
			var _doc = <RestaurantDoc>req.body;
			var restaurantBusiness = new RestaurantBusiness();
			var id = req.params._id;
			restaurantBusiness.update(id, _doc, (err, result) => {
				if (err) res.send({ 'result': 'error' })
				else res.send({ 'result': 'success' });
			})
		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" })
		}
	}
	delete(req: express.Request, res: express.Response) {
		try {
			var _id: string = req.params._id;
			var restaurantBusiness = new RestaurantBusiness();
			restaurantBusiness.delete(_id, (error) => {
				error ? res.send({ "result": "error!" }) : res.send({ "result": "success" });
			})
		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" })
		}
	}
	retrieve(req: express.Request, res: express.Response) {
		try {
			var restaurantBusiness = new RestaurantBusiness();
			restaurantBusiness.retrieve((error, result) => {
				error ? res.render('index', { "result": "error" }) : res.render('index', { result: result });
			})
		} catch (e) {
			console.log(e);
			res.send({ "error": "error in your request" })
		}
	}
	findById(req: express.Request, res: express.Response) {
		try {
			var _id: string = req.params._id;
			var restaurantBusiness = new RestaurantBusiness();
			restaurantBusiness.findById(_id, (error, result) => {
				error ? res.render('index', { "result": "error" }) : res.render('index', { "result": result });
			})
		} catch (e) {
			console.log(e);
			res.render('index', { "error": "error in your request" })
		}
	}
}