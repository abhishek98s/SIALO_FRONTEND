import jwt from 'jsonwebtoken';

export const isTokenValid = (token: string) => {
    const secretKey = process.env.JWT_SECRET_KEY;

    try {
        const decodedToken: string | jwt.JwtPayload = jwt.verify(token, secretKey!);

        const tokenIssuedAt = (decodedToken as jwt.JwtPayload).iat;
        const tokenExpiresAt = (decodedToken as jwt.JwtPayload).exp;

        // Check if token has expired
        if (tokenExpiresAt! < Date.now() / 1000) {
            return false;
        }

        // Check if token was issued in the past
        if (tokenIssuedAt! > Date.now() / 1000) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};
