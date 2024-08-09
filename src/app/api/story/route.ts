import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const response = await axios.get('https://sialo-backend-2.vercel.app/api')
    } catch (error) {
        return NextResponse.json({ status: false }, {})
    }
}
