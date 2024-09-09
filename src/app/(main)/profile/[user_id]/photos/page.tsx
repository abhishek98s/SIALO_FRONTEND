'use client';

import React from 'react';
import { useParams } from "next/navigation";

import { Gallery, Item } from "react-photoswipe-gallery";

import { APP_BASE_URL } from "@/utils/app";
import { IUserPhoto } from "@/types/profiles.types";
import useFetchData from "@/custom_hook/fetchdata.hook";
import { UserPhoto } from "@/components/user_photo";
import UserPhotoLoader from "@/components/user_photo_loader";


export default function PhotoPage() {
    const { user_id } = useParams();

    const { data: userPhotoList, loading } = useFetchData(`${APP_BASE_URL}/post/${user_id}`)

    return (
        <>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-[12px] w-full">
                <Gallery>
                    {userPhotoList.map((photo: IUserPhoto, index: number) => (
                        <Item key={index}
                            original={photo.post_image}
                            thumbnail={photo.post_image}
                            width="1024"
                            height="500">
                            {({ ref, open }) => (
                                <UserPhoto imageRef={ref} open={open} photo={photo} />
                            )}
                        </Item>
                    ))}
                    {loading && <UserPhotoLoader />}
                </Gallery>
            </section >
        </>
    )
}
