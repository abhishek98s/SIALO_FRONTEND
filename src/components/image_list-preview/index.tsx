import { IFeed } from "@/types/home.types.";
import { APP_BASE_URL } from "@/utils/app";
import { axiosInterceptor } from "@/utils/axois.config";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FeedImageLoader from "../image_list_loader";
import useFetchData from "@/custom_hook/fetchdata.hook";

export default function ImageListPreview() {

    const { user_id } = useParams();

    const { data: randomPhotoList, error, loading } = useFetchData(`${APP_BASE_URL}/post/random?=noOfPosts=4`);

    return (
        <div className="image-wrapper hidden lg:block max-w-[240px] w-full border-neutral-80 rounded-4 border-neutral-96 bg-neutral-90 p-[12px] pt-[20px] h-fit">
            <h4 className="heading-line font-bold text-[14px] color-primary-60 mb-[32px]">Photos</h4>

            <div className="image-list flex flex-wrap gap-[8px] mb-[8px]">

                {randomPhotoList.map((item: IFeed, index: number) => (
                    <figure key={index} className="rounded-4 border-neutral-86 max-w-[100px] w-full h-[100px] relative">
                        <Image className="w-full h-auto object-cover rounded-4 border-neutral-80" src={item.post_image} priority fill={true} alt="user" />
                    </figure>
                ))}

                {loading && <FeedImageLoader />}
            </div>

            <Link href={`/profile/${user_id}/photos`} className="text-center txt-focus block text-[14px] mx-auto color-primary-60">view more</Link>
        </div>
    )
}
