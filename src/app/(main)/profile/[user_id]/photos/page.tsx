'use client';

import { UserPhoto } from "@/components/user_photo";
import { setUserPhotos } from "@/lib/features/photos.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { user_photo_arr } from "@/seed_data/photo.seed";
import { IFeed } from "@/types/home.types.";
import { IUserPhoto } from "@/types/profiles.types";
import { APP_BASE_URL } from "@/utils/app";
import { axiosInterceptor } from "@/utils/axois.config";
import { toast_error_option } from "@/utils/toast";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Gallery, Item } from "react-photoswipe-gallery";



export default function PhotoPage() {
    const user_photo_list: IUserPhoto[] = useAppSelector((state) => state.photo.user_photos_list);
    const dispatch = useAppDispatch();
    const axiosInstance = axiosInterceptor();
    const { user_id } = useParams();

    const getPhotos = async () => {
        try {

            const response = await axiosInstance.get(`${APP_BASE_URL}/post/${user_id}`);
            const { status, data } = response.data;

            const photos = data.map((item: IFeed) => {
                return {
                    id: item.id,
                    user_name: item.name,
                    image_url: item.post_image,
                }
            })
            if (!status) throw new Error();
            dispatch(setUserPhotos(photos))
        } catch (error) {
            toast.error('Error getiing the photos', toast_error_option);
        }
    }

    useEffect(() => {
        getPhotos();
    }, [dispatch])

    return (
        <>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-[12px] w-full">
                <Gallery>
                    {user_photo_list.map((photo, index) => (
                        <Item key={index}
                            original={photo.image_url}
                            thumbnail={photo.image_url}
                            width="1024"
                            height="500">
                            {({ ref, open }) => (
                                <UserPhoto imageRef={ref} open={open} photo={photo} />
                            )}
                        </Item>
                    ))}
                </Gallery>
            </section >
        </>
    )
}
