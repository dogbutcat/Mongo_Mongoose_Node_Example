import * as express from 'express';
export interface ReadController {
    retrieve: express.RequestHandler
    findById: express.RequestHandler
}
export interface WriteController {
    create: express.RequestHandler
    update: express.RequestHandler
    delete: express.RequestHandler
}
