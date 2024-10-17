import { APP_BASE_URL } from "@/utils/app";
import { handleErrorResponse } from "@/utils/error";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization');
        const response = await axios.get(`${APP_BASE_URL}/post/random?noOfPosts=10`, {
            headers: {
                Authorization: token,
            },
        });

        return NextResponse.json({ ...response.data }, { status: 201 })
    } catch (error: any) {
        return handleErrorResponse(error);
    }
}


export async function POST(req: NextRequest) {
    try {
        const { formData, token } = await getFormDataAndToken(req);

        const caption = formData.get('caption');
        const sialoImage = formData.get('sialo_image');
        const base64Image = formData.get('base64_image');

        if (!caption || (!sialoImage && !base64Image)) {
            throw new Error('Caption and image are required');
        }

        const formDataToSend = new FormData();

        if (base64Image) {
            const { buffer, filename } = getBufferAndFilenameFromBase64(base64Image as string);
            formDataToSend.append('sialo_image', new Blob([buffer], { type: 'image/png' }), filename);
        } else {
            formDataToSend.append('sialo_image', sialoImage!);
        }

        formDataToSend.append('caption', caption);

        const response = await axios.post(`${APP_BASE_URL}/post`, formDataToSend, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = response.data.data;
        return NextResponse.json({ status: true, data }, { status: 201 });
    } catch (error: any) {
        return handleErrorResponse(error);
    }
}

async function getFormDataAndToken(req: NextRequest) {
    const formData = await req.formData();
    const token = req.headers.get('Authorization');
    return { formData, token };
}

function getBufferAndFilenameFromBase64(base64Image: string) {
    const data = base64Image.toString().replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(data, 'base64');
    const currentDate = new Date();
    const filename = `IMG_${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}_${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}.png`;
    return { buffer, filename };
}

