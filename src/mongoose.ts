// 1.import
import { CONNECTION_STRING } from './Constants';
import { Document, Connection, connection, connect, Types, Model, MongooseThenable } from 'mongoose';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as consolidate from 'consolidate';

export interface Addres {
	building: string;
	coord: number[];
	street: string;
	zipcode: string;
}

export interface Grade {
	date: string;
	grade: string;
	score: number;
}

export interface RootObject extends Document {
	address: Addres;
	borough: string;
	cuisine: string;
	grades: Grade[];
	name: string;
	restaurant_id: string;
}

/**
 * BaseModel
 */
class BaseModel<T> {
	private _baseModel: T
	constructor(param: T) {
		this._baseModel = param
	}

	public get baseModel(): T {
		return this._baseModel
	}

	public getProperty<K extends keyof T>(key: K) {
		return this._baseModel[key];
	}
}

/**
 * Restaurant Model extends BaseModel
 */
@Object.seal
class RestaurantModel extends BaseModel<RootObject> {

	// public get address() : Addres {
	// 	return this._restaurantModel.address;
	// }

	constructor(parameters: RootObject) {
		super(parameters)
	}
}

// var db = mongoose.connection;

// db.on('error', console.error);
// db.once('open', () => {
//     // Modes and Modules
// })

export class DataAccess {
	static mongooseInstance: MongooseThenable
	static mongooseConnection: Connection

	constructor() {
		DataAccess.Connect()
	}

	static Connect() {
		if (this.mongooseConnection) return this.mongooseConnection;
		this.mongooseConnection = connection;
		this.mongooseConnection.once('open', () => {
			console.log('Successful Connect to Mongo');
		})
		this.mongooseConnection.on('error', () => {
			console.error;
		})
		this.mongooseInstance = connect(CONNECTION_STRING);
		return this.mongooseInstance;
	}
}

namespace Common {
	export interface Read<T> {
		retrieve: (callback: (err: any, result: any) => void) => void;
		findById: (id: string, callback: (err: any, result: T) => void) => void;
	}
	export interface Write<T> {
		create: (item: T, callback: (error: any, result: any) => void) => void;
		update: (_id: string, item: T, callback: (error: any, result: any) => void) => void;
		delete: (_id: string, callback: (error: any) => void) => void;
	}
}

/**
 * Repository Module for Business Module
 */
namespace Repository {
	class RepositoryBase<T extends Document> implements Common.Read<T>, Common.Write<T>{
		private _model: Model<Document>;
		constructor(schemaModel: Model<Document>) {
			this._model = schemaModel;
		}
		update(_id: string, item: T, callback: (error: any, result: any) => void) {
			this._model.update({ _id: this.toObjectId(_id) }, item, callback);
		}
		create(item: T, callback: (error: any, result: any) => void) {
			this._model.create(item, callback);
		};
		delete(_id: string, callback: (error: any) => void) {
			this._model.remove({ _id: this.toObjectId(_id) }, callback);
		}
		retrieve(callback: (err: any, result: any) => void) {
			this._model.find({}, callback);
		}
		findById(_id: string, callback: (err: any, result: T) => void) {
			this._model.findById(_id, callback);
		}
		private toObjectId(_id: string) {
			return Types.ObjectId.createFromHexString(_id);
		}
	}
	export class RestaurantRepository extends RepositoryBase<RootObject>{
		constructor() {
			super(schemaModel)
		}
	}
}

/**
 * Business Module for Controller Module
 */
namespace Business {
	export interface BaseBusiness<T> extends Common.Read<T>, Common.Write<T> { }
	export interface IRestaurantBusiness extends BaseBusiness<RootObject> { }
	@Object.seal
	export class RestaurantBusiness implements IRestaurantBusiness {
		private _restaurant: Repository.RestaurantRepository;
		constructor() {
			this._restaurant = new Repository.RestaurantRepository();
		}
		create(item: RootObject, callback: (error: any, result: any) => void) {
			this._restaurant.create(item, callback);
		}
		retrieve(callback: (error: any, result: any) => void) {
			this._restaurant.retrieve(callback);
		}
		update(_id: string, item: RootObject, callback: (error: any, result: any) => void) {
			this._restaurant.update(_id, item, callback);
		}
		delete(_id: string, callback: (error: any) => void) {
			this._restaurant.delete(_id, callback);
		}
		findById(_id: string, callback: (error: any, result: RootObject) => void) {
			this._restaurant.findById(_id, callback);
		}
	}
}

namespace Controller {
	interface ReadController {
		retrieve: express.RequestHandler;
		findById: express.RequestHandler;
	}
	interface WriteController {
		create: express.RequestHandler;
		update: express.RequestHandler;
		delete: express.RequestHandler;
	}
	interface BaseController<T extends Business.BaseBusiness<Object>> extends ReadController, WriteController { }
	export class RestaurantController implements BaseController<Business.RestaurantBusiness>{
		create(req: express.Request, res: express.Response) {
			try {
				var restaurant: RootObject = <RootObject>req.body;
				var restaurantBusiness = new Business.RestaurantBusiness();
				restaurantBusiness.create(restaurant, (error, result) => {
					// API specific design 
					// if (error) res.send({ "result": "error" });
					// else res.send({ "result": "success" })
					if (error) res.render('index', { "result": "error" });
					else res.render('index', { "result": "success" })
				})
			} catch (e) {
				console.log(e);
				res.send({ "error": "error in your request" });
			}
		}
		update(req: express.Request, res: express.Response) {
			try {
				var restaurant: RootObject = <RootObject>req.body;
				var _id: string = req.params._id;
				var restaurantBusiness = new Business.RestaurantBusiness();
				restaurantBusiness.update(_id, restaurant, (error, result) => {
					if (error) res.send({ "result": "error" });
					else res.send({ "result": "success" })
				})
			} catch (e) {
				console.log(e);
				res.send({ "error": "error in your request" })
			}
		}
		delete(req: express.Request, res: express.Response) {
			try {
				var _id: string = req.params._id;
				var restaurantBusiness = new Business.RestaurantBusiness();
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
				var restaurantBusiness = new Business.RestaurantBusiness();
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
				var restaurantBusiness = new Business.RestaurantBusiness();
				restaurantBusiness.findById(_id, (error, result) => {
					error ? res.render('index', { "result": "error" }) : res.render('index', { "result": result });
				})
			} catch (e) {
				console.log(e);
				res.render('index', { "error": "error in your request" })
			}
		}
	}
}

namespace Route {
	/**
	 * RestaurantRoutes
	 */
	class RestaurantRoutes {
		private _restaurantController: Controller.RestaurantController;
		constructor() {
			this._restaurantController = new Controller.RestaurantController();
		}
		get route() {
			var router = express.Router();
			var controller = this._restaurantController;
			router.get("/restaurants", controller.retrieve);
			router.post("/restaurants", controller.create);
			router.put("/restaurants/:_id", controller.update);
			router.get("/restaurants/:_id", controller.findById);
			router.delete("/restaurants/:_id", controller.delete);
			return router;
		}
	}
	export class BaseRoute {
		get route() {
			var app = express();
			app.use('/', new RestaurantRoutes().route)
			return app;
		}
	}
}

namespace Middleware {
	export class MiddlewareBase {
		static get configureation() {
			var app = express();
			app.use(bodyParser.json());
			app.use(new Route.BaseRoute().route);
			return app;
		}
	}
}

DataAccess.Connect();
let instance = DataAccess.mongooseInstance;
let connector = DataAccess.mongooseConnection;

// Schema based on db connection instance
var schema = new instance.Schema({
	address: {
		building: String,
		coord: [Number],
		street: String,
		zipcode: String
	},
	borough: {
		type: String,
		required: true
	},
	cuisine: String,
	// cant use typescript constructor type to schema
	grades: [{
		date: String,
		grade: String,
		score: Number
	}],
	name: String,
	restaurant_id: String
})

// schema Model based on db connection
var schemaModel = connector.model<RootObject>('restaurants', schema);
var app = express();
var port = parseInt(process.env.PORT, 10) || 8000;

app.engine('handlebars', consolidate.handlebars);
app.set('view engine', 'handlebars');
app.set('port', port);
app.use(Middleware.MiddlewareBase.configureation);
app.listen(port, () => {
	console.log('Express running on Port:' + port);
})