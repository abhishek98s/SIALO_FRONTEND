'use client';

import Image from "next/image";
import Link from "next/link";

import styles from './profile.module.scss';

import { useParams, usePathname } from 'next/navigation';
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from "react-photoswipe-gallery";
import { useEffect, useState } from "react";
import { axiosInterceptor } from "@/utils/axois.config";
import { APP_BASE_URL } from "@/utils/app";
import toast from "react-hot-toast";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";


interface IProfileUser {
    name: string,
    img: string,
    _id: string,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<IProfileUser>();
    const axiosInstance = axiosInterceptor();

    const pathname = usePathname();
    const length = pathname.split('/').length;
    const currentPath = pathname.split('/')[length - 1];


    const { user_id } = useParams();

    const getUserData = async () => {
        const axiosInstance = axiosInterceptor();
        const response = await axiosInstance.get(`${APP_BASE_URL}/user/${user_id}`);
        const { status, data } = response.data;

        console.log(data);
        setUser(data);
    }

    const onFriendRequestSent = async () => {
        try {
            const response = await axiosInstance.patch(`${APP_BASE_URL}/user/friend/add/${user_id}`);

            const { status, data, message } = response.data;

            if (!status) throw new Error();

            toast.success(message, toast_sucess_option);

        } catch (error) {
            toast.error('Error sending the friend request', toast_error_option);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <>
            <div className="lg:pl-[230px]">
                <section className="search-page max-w-[910px] w-full mx-auto">
                    <Image src={`/banner.png`} width={900} height={250} alt={`banner`} className="w-full h-[200px] lg:h-auto rounded-b-[12px] border-neutral-80 object-cover object-center" />

                    <div className="relative px-[0px] lg:px-[32px] -mt-[50px]">
                        <div className={`${styles.profile_header} mb-[10px] lg:mb-[20px] bg-neutral-90 border-neutral-86 rounded-[8px] px-[16px] pt-[20px]`}>
                            <div className="flex items-center gap-[12px]" role="header">
                                <Gallery>
                                    <Item
                                        original={`/user.png`}
                                        thumbnail={`/user.png`}
                                        width="400"
                                        height="550"
                                    >
                                        {({ ref, open }) => (
                                            <Image ref={ref} onClick={open} src={user?.img ? user?.img : '/icons/icon-user.svg'} width={60} height={60} alt={`user`} className="rounded-full border-primary-60" />
                                        )}
                                    </Item>
                                </Gallery>

                                <h2 className="text-[24px] font-bold color-primary-60">{user?.name}</h2>

                                <button onClick={onFriendRequestSent} className="primary-btn ml-auto max-w-[92px] w-full h-[32px] text-[14px] font-bold">Add Friend</button>
                            </div>

                            <div className="bg-neutral-86 h-[1px] w-full my-[20px]"></div>

                            <div className="nav-wrapper flex gap-[16px]">
                                <Link href={`/profile/${user_id}/feed`} className={`${styles.nav} ${currentPath == 'feed' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Feed</Link>
                                <Link href={`/profile/${user_id}/friends`} className={`${styles.nav} ${currentPath == 'friends' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Friends</Link>
                                <Link href={`/profile/${user_id}/photos`} className={`${styles.nav} ${currentPath == 'photos' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Photos</Link>
                            </div>
                        </div>

                        <div className="main-wrapper flex lg:flex-row gap-[12px]">
                            {children}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
