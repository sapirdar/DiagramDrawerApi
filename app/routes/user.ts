import express, { Router } from 'express';
import { UserController } from '../controllers/user';
import { Auth } from '../middleware/auth';
const bodyParser = require('body-parser');


const userRouter: Router = express.Router();
const userCtrl = new UserController();
const auth = new Auth();

userRouter.use(bodyParser.json());

userRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

userRouter.post('/signup', userCtrl.signup);
userRouter.post('/login', userCtrl.login);
userRouter.post('/delete', userCtrl.delete);


// router.put('/:id', auth, multer, userCtrl.updateDetails);

export { userRouter }







