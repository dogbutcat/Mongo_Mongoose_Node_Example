import { Model, Document, Types } from 'mongoose';
import { Read, Write } from '../dal/Common';

export class BaseRepo<T extends Document> implements Read<T>, Write<T>{
    private _model: Model<Document>;
    constructor(schemaModel: Model<Document>) {
        this._model = schemaModel;
    }
    private toObjectId(id: string) {
        return Types.ObjectId.createFromHexString(id);
    }
    create(item: T, callback: (err, result) => void) {
        this._model.create(item, callback);
    }
    update(id: string, item: T, callback: (err, result) => void) {
        this._model.update({ _id: this.toObjectId(id) }, item, callback);
    }
    delete(_id: string, callback: (error: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, callback);
    }
    retrieve(callback: (err: any, result: any) => void) {
        this._model.find({}, callback);
    }
    findById(_id: string, callback: (err: any, result: T) => void) {
        this._model.findById(_id, callback);
    }
}