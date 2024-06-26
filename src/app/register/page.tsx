import { Metadata } from 'next';
import RegisterForm from './register';

export const metadata: Metadata = {
    title: 'Register',
};

export default function Register() {
    return (
        <RegisterForm />
    )
}