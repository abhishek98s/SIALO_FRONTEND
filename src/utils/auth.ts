import jwt from 'jsonwebtoken';

const token = 'your_jwt_token';


export const validateToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, 'process.env.SECRET_KEY');
        console.log(decoded); // decoded token payload
        return decoded;
    } catch (error) {
        console.error(error); // invalid token
    }
}

