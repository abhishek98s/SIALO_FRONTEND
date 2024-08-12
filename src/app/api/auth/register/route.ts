// app/api/route.js

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const bodyClone = await req.clone();
        const body = await bodyClone.json();

        const response = await axios.post('https://sialo-backend-2.vercel.app/api/auth/register', body);

        if (!response.data) throw new Error();

        const data = await response.data.data;

        return NextResponse.json({ token: data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
