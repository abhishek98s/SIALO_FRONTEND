import { IFeed } from "@/types/home.types.";
import { APP_BASE_URL } from "@/utils/app";
import { axiosInterceptor } from "@/utils/axois.config";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FeedImageLoader from "../image_list_loader";

export default function ImageListPreview() {
    const [randomPhoto, setRandomPhoto] = useState<IFeed[]>([]);

    const axiosInstance = axiosInterceptor();

    const { user_id } = useParams();

    const getPhoto = async () => {
        try {
            const response = await axiosInstance.get(`${APP_BASE_URL}/post/random/${user_id}?=noOfPosts=4`);
            const { status, data } = response.data;

            if (!status) throw new Error();

            setRandomPhoto(data);
        } catch (error) {
            toast.error('Erro fetching the image');
        }
    }

    useEffect(() => {
        getPhoto();
    }, [])
    return (
        <div className="image-wrapper hidden lg:block max-w-[240px] w-full border-neutral-80 rounded-4 border-neutral-96 bg-neutral-90 p-[12px] pt-[20px] h-fit">
            <h4 className="heading-line font-bold text-[14px] color-primary-60 mb-[32px]">Photos</h4>

            <div className="image-list flex flex-wrap gap-[8px] mb-[8px]">

                {randomPhoto.map((item, index) => (
                    <figure key={index} className="rounded-4 border-neutral-86 max-w-[100px] w-full h-[100px] relative">
                        <Image className="w-full h-auto object-cover rounded-4 border-neutral-80" src={item.post_image} priority fill={true} alt="user" />
                    </figure>
                ))}

                {randomPhoto.length === 0 && <FeedImageLoader />}
            </div>

            <Link href={`/profile/${user_id}/photos`} className="text-center txt-focus block text-[14px] mx-auto color-primary-60">view more</Link>
        </div>
    )
}
