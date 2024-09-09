import React from 'react';
import { Metadata } from 'next';

import RegisterForm from './register';

export const metadata: Metadata = {
    title: 'Sialo | Register',
}
export default function Register() {
    return (
        <RegisterForm />
    )
}
