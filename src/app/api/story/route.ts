import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { APP_BASE_URL } from "@/utils/app";

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization');
        const response = await axios.get(`${APP_BASE_URL}/story`, {
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


export async function POST(req: NextRequest) {
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

        const response = await axios.post(`${APP_BASE_URL}/story`, formDataToSend, {
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


export async function DELETE(req: NextRequest) {
    try {

        const token = req.headers.get('Authorization');
        const story_id = req.nextUrl.searchParams.get('id');

        const response = await axios.delete(`${APP_BASE_URL}/story/${story_id}`, {
            headers: {
                Authorization: token,
            },
        });

        if (!response.status) {
            throw new Error('Failed to delete story');
        }
        console.log("sucess")

        const data = response.data;
        return NextResponse.json({ status: true, data: data }, { status: 201 })
    } catch (error: any) {

        console.log((error as Error).message)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.msg;
            return NextResponse.json({ status: false, message: errorMsg }, { status: error.response.status });
        } else {
            return NextResponse.json({ status: false, message: 'Internal Server Error' }, { status: 500 });
        }
    }
}
