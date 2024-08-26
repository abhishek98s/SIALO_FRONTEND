import * as jwt from 'jose';

export const decodeToken = (token: string) => {
    const decoded = jwt.decodeJwt(token);
    return decoded;
};
