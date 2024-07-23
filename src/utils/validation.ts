import z from 'zod';

export const register_schema = z.object({
    name: z.string().min(3, 'Name should be atleast three character'),
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be 8 character long and contain at least one lowercase letter, one uppercase letter, and one digit'),
})
