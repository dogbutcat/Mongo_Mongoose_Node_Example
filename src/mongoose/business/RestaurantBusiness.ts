import { BaseBusiness } from './BaseBusiness';
import { RestaurantDoc } from '../model/Restaurant';
import { RestaurantRepo } from '../repository/RestaurantRepo';
interface IRestaurantBusiness extends BaseBusiness<RestaurantDoc> { }

export class RestaurantBusiness implements IRestaurantBusiness {
    private _rest: RestaurantRepo;
    constructor() {
        this._rest = new RestaurantRepo;
    }
    create(item: RestaurantDoc, callback: (err, result) => void) {
        this._rest.create(item, callback);
    }
    update(id: string, item: RestaurantDoc, callback: (err, result) => void) {
        this._rest.update(id, item, callback);
    }
    delete(id: string, callback: (err) => void) {
        this._rest.delete(id, callback);
    }
    retrieve(callback: (error: any, result: any) => void) {
        this._rest.retrieve(callback);
    }
    findById(id: string, callback: (error: any, result: RestaurantDoc) => void) {
        this._rest.findById(id, callback);
    }
}