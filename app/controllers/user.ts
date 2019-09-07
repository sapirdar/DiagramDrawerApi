import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";
import { User } from '../schemas/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class UserController {

  signup(req: Request, res: Response, next: NextFunction) {
    bcrypt.hash(req.body.password, 10).then(
      (hash: string) => {
        const user = new User(req.body);
        user.password = hash;

        user.save().then((data) => { res.status(200).json(data); }
        ).catch(
          (error: any) => {
            res.status(500).send(error);
          }
        );
      }
    );
  };

  login = (req: any, res: any, next: any) => {
    User.findOne({ email: req.body.email }).then(
      (user: any) => {
        if (!user) {
          return res.status(401).send('User not found.');
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid: boolean) => {
            if (!valid) {
              return res.status(401).send('Incorrect password.');
            }
            const token = jwt.sign(
              { user: user },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
            res.status(200).json({
              user: user,
              token: token
            });
          }
        ).catch(
          (error: any) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error: any) => {
        res.status(500).send(error);
      }
    );
  }


  delete = (req: any, res: any) => {
    User.deleteOne({ _id: req.params.id }).then(() => {
      res.status(201).json({
        message: 'User deleted successfully!'
      });
    }
    ).catch(
      (error: any) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

}