import React from 'react';
import { Metadata } from "next"
import Login from "./login"


export const metadata:Metadata = {
    title: 'Sialo | Login',
}

export default function LoginPage() {
    return (
        <Login />
    )
}
