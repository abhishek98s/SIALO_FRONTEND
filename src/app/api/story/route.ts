import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const token = req.headers.get('Authorization');
        const response = await axios.get('https://sialo-backend-2.vercel.app/api/story', {
            headers: {
                Authorization: token,
            },
        });

        return NextResponse.json({ ...response.data }, { status: 201 })
    } catch (error: any) {
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.msg;
            return NextResponse.json({ status: false, message: errorMsg }, { status: error.response.status });
        } else {
            return NextResponse.json({ status: false, message: 'Internal Server Error' }, { status: 500 });
        }
    }
}


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const fromData = await req.formData();
        const token = req.headers.get('Authorization');

        const caption = fromData.get('caption');
        const sialo_image = fromData.get('sialo_story_image');

        if (!caption || !sialo_image) {
            throw new Error('Caption and image are required');
        }

        const formDataToSend = new FormData();
        formDataToSend.append('caption', caption);
        formDataToSend.append('sialo_story_image', sialo_image);

        const response = await axios.post('https://sialo-backend-2.vercel.app/api/story', formDataToSend, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
            },
        })

        if (!response.data) throw new Error();

        const data = await response.data.data;

        return NextResponse.json({ status: true, data: data }, { status: 201 })
    } catch (error: any) {
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.msg;
            return NextResponse.json({ status: false, message: errorMsg }, { status: error.response.status });
        } else {
            return NextResponse.json({ status: false, message: 'Internal Server Error' }, { status: 500 });
        }
    }
}
