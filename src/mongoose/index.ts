import * as express from 'express';
import { MainMiddleware } from './middleware/MainMiddleware';
import { SetViewEngine } from './middleware/ViewEngineMiddleware';

var app = express();
var port = parseInt(process.env.PORT) || 8000;
SetViewEngine.handlerbars(app);
app.use(MainMiddleware.Configuration);
app.listen(port, () => {
    console.log('Express running on port:' + port);
})