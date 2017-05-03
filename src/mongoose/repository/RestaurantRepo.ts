import { BaseRepo } from './BaseRepo';
import { RestaurantDoc } from '../model/Restaurant';
import { SchemaModel } from '../db/schema/RestaurantSchema';

export class RestaurantRepo extends BaseRepo<RestaurantDoc>{
    constructor() {
        super(SchemaModel)
    }
}