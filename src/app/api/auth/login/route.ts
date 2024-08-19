// app/api/route.js

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const bodyClone = await req.clone();
        const body = await bodyClone.json();

        const { email, password } = body;

        const response = await axios.post('https://sialo-backend-2.vercel.app/api/auth/login', { email, password });

        const data = await response.data.data;

        return NextResponse.json({ token: data }, { status: 201 });
    } catch (error) {
        console.log((error as Error).message)
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}