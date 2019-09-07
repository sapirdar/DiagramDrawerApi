import { Request } from 'express';
import { runInThisContext } from 'vm';
var atob = require('atob');

export class AuthHelper {
    public getLoggenOnUserId(req: any) {
        const token = this.getHeaderToken(req);
        if (token) {
            const user = this.getLoggenOnUserFromToken(token);
            if (user) {
                return user.id;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }


    private getLoggenOnUserFromToken(token: string) {
        console.log('token', token, '\n');
        try {
            const tokenParts = token.split('.');
            const encodedPayload = tokenParts[1];
            const rawPayload = atob(encodedPayload);
            const user = JSON.parse(rawPayload);
            console.log(user.id); // outputs 'bob'
            return user;
        } catch (error) {
            console.log('error', error, '\n');
            return null;
        }
    }

    private getHeaderToken(req: any) {
        if (req && req.headers && req.headers.authorization) {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }
}






