# Mongo_Mongoose_Node_Example

## Howtodoes

1. You need install Mongodb on your system or existed Mongodb Connection, change CONNECTION_STRING in src/Constants.ts

1. need to import database from file primer-dataset.json through ```mongoimport --db test --collection restaurants
 --drop --file ./primer-dataset.json```

1. run ```tsc``` command and ```node build/mongoose.js``` or ```node build/mongo.js``` or ```PORT=[your port] node build/mongoose.js```

1. visit [site](http://127.0.0.1:8000)

## References

mongoose example refer from [NodeJSWithTypescript](https://github.com/ErickWendel/NodeJSWithTypescript)