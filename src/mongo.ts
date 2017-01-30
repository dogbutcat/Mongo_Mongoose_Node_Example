import * as express from 'express';
import * as consolidate from 'consolidate';
import { MongoClient } from 'mongodb';

import { CONNECTION_STRING } from './Constants';

var app = express();
app.engine('handlebars', consolidate.handlebars);
app.set('view engine', 'handlebars');

MongoClient.connect(CONNECTION_STRING, (err, db) => {
    err == null ? console.log('Success Connect to Mongo Database!') : console.log(err.message);

    app.get('/', (req, res) => {
        db.collection('restaurants').findOne({}, (err, doc) => {
            res.render('index',{text:JSON.stringify(doc)})
        });
        // db.collection('restaurants').find({}).toArray()
    })

    var server = app.listen(8000, () => {
        var port = server.address().port;
        console.log('Express running at %s.', port);
    })
})