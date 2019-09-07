import express, { Router } from 'express';
import * as bodyParser from 'body-parser';

import { DiagramsController } from '../controllers/diagram';
import { AuthHelper } from '../middleware/auth.helper';
import { Auth } from '../middleware/auth';

const diagramCtrl = new DiagramsController();
const auth = new Auth();

const diagramRouter: Router = express.Router();

diagramRouter.use(bodyParser.json());

diagramRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

diagramRouter.get('/', diagramCtrl.getList);
diagramRouter.get('/:id', diagramCtrl.getOne);
diagramRouter.post('/', diagramCtrl.create);
diagramRouter.put('/:id', auth.run, diagramCtrl.update);
diagramRouter.delete('/:id', auth.run, diagramCtrl.delete);

export { diagramRouter }




