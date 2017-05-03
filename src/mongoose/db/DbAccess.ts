import { MongooseThenable, Connection, connection, connect } from 'mongoose';
import { CONNECTION_STRING } from '../../Constants';
export class DbAccesser {
    static mongooseInstance: MongooseThenable;
    static mongooseConnection: Connection;
    constructor() {
        DbAccesser.Connect();
    }
    static Connect() {
        if (this.mongooseInstance) return this.mongooseInstance;
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
DbAccesser.Connect()