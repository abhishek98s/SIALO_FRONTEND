'use client';

import { UserPhoto } from "@/components/user_photo";
import { setUserPhotos } from "@/lib/features/photos.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { user_photo_arr } from "@/seed_data/photo.seed";
import { IUserPhoto } from "@/types/profiles.types";
import { useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";



export default function PhotoPage() {
    const user_photo_list: IUserPhoto[] = useAppSelector((state) => state.photo.user_photos_list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getFeed = () => {
            dispatch(setUserPhotos(user_photo_arr))
        }

        getFeed();
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
                            height="768">
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
