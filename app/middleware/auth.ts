import { AuthHelper } from "./auth.helper";

const jwt = require('jsonwebtoken');

export class Auth {
  authHelper = new AuthHelper();

  run = (req: any, res: any, next: any) => {
    try {
      const user = this.authHelper.getLoggenOnUser(req);
      if (req.body.userId && req.body.userId !== user._id) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };
}