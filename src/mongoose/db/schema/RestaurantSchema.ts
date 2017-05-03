import { DbAccesser } from '../DbAccess';
import { RestaurantDoc } from '../../model/Restaurant';

let instance = DbAccesser.mongooseInstance;
let connector = DbAccesser.mongooseConnection;

class RestaurantSchema {
    static get Schema() {
        var schemaConstructor = new instance.Schema({
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
        return schemaConstructor;
    }
}

export const SchemaModel = connector.model<RestaurantDoc>('restaurants', RestaurantSchema.Schema);