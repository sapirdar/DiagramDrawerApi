import { Request } from 'express';
var atob = require('atob');

export class AuthHelper {
    loggenOnUserId = null;

    getLoggenOnUserId = (token: string) => {
        console.log('token', token, '\n');
        try {
            const tokenParts = token.split('.');
            const encodedPayload = tokenParts[1];
            const rawPayload = atob(encodedPayload);
            const data = JSON.parse(rawPayload);
            console.log(data.user.userId); // outputs 'bob'
            return data.user._id;
        } catch (error) {
            console.log('error', error, '\n');
            return null;
        }
    }

    getLoggenOnUser = (token: string) => {
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

    getHeaderToken = (req: any) => {
        return req.headers.authorization.split(' ')[1];
    }
}






