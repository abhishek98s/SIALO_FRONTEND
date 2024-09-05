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
import toast, { Toaster } from "react-hot-toast";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";
import useFetchData from "@/custom_hook/fetchdata.hook";
import FeedCoverPicture from "@/components/feed_cover_picture";
import UserProfileheader from "@/components/user_profile_header";
import { IProfileUser } from "@/types/home.types.";
import { useAppSelector } from "@/lib/hooks";



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const axiosInstance = axiosInterceptor();

    const pathname = usePathname();
    const length = pathname.split('/').length;
    const currentPath = pathname.split('/')[length - 1];
    const authUserId = useAppSelector((state) => state.auth.user?.id);

    const { user_id } = useParams();
    const [isAuthUser, setIsAuthUser] = useState(false);

    useEffect(() => {
        let isloggedInUser = (authUserId === user_id) ? true : false;

        setIsAuthUser(isloggedInUser);
    }, [authUserId, user_id])

    const { data, error, loading, refetch } = useFetchData(`${APP_BASE_URL}/user/${user_id}`, user_id);

    const user: IProfileUser = {
        _id: (data as IProfileUser)._id,
        img: (data as IProfileUser).img,
        name: (data as IProfileUser).name,
        isFriend: (data as IProfileUser).isFriend,
        coverImg: (data as IProfileUser).coverImg,
    };

    const onFriendRequestSent = async () => {
        try {
            const response = await axiosInstance.patch(`${APP_BASE_URL}/user/friend/add/${user_id}`);

            const { status, data, message } = response.data;

            if (!status) throw new Error();

            toast.success(message, toast_sucess_option);
            refetch();
        } catch (error) {
            toast.error('Error sending the friend request', toast_error_option);
        }
    }


    return (
        <>
            <div className="lg:pl-[230px]">

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        success: { ...toast_sucess_option },
                        error: { ...toast_error_option },
                    }}
                />
                <section className="search-page max-w-[910px] w-full mx-auto">

                    <FeedCoverPicture isAuthUser={isAuthUser} user={user} refetchUserData={refetch} />

                    <div className="relative px-[0px] lg:px-[32px] -mt-[50px]">
                        <div className={`${styles.profile_header} mb-[10px] lg:mb-[20px] bg-neutral-90 border-neutral-86 rounded-[8px] px-[16px] pt-[20px]`}>
                            <UserProfileheader isAuthUser={isAuthUser} refetchUserData={refetch} onFriendRequestSent={onFriendRequestSent} user={user} />

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
