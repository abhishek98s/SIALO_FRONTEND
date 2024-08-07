import * as jwt from 'jose';


import { jwtDecode } from 'jwt-decode';

export const validateToken = async (token: string) => {
    // try {
    //     const secret = new TextEncoder().encode(
    //         "sialo social media app"
    //     )
    //     const decodedCoed = await jwt.decodeJwt(token);
    //     console.log(decodedCoed); // decoded token payload

    //     const decoded = await jwt.jwtVerify(token.replace('Bearer ', ''), secret);
    //     console.log(decoded); // decoded token payload
    //     return decoded;
    // } catch (error) {
    //     console.error((error as Error).message); // invalid token
    // }
}

export const decodeToken = (token: string) => {
    const decoded = jwt.decodeJwt(token);
    return decoded;
};

export const isTokenExpired = (token: string) => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;
    }
}
