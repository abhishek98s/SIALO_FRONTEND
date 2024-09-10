'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation';

import styles from './profile.module.scss';
import { Toaster } from "react-hot-toast";
import 'photoswipe/dist/photoswipe.css'

import { useAppSelector } from "@/lib/hooks";
import { IProfileUser } from "@/types/home.types.";
import { APP_BASE_URL } from "@/utils/app";
import useFetchData from "@/custom_hook/fetchdata.hook";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";

import FeedCoverPicture from "@/components/feed_cover_picture";
import UserProfileheader from "@/components/user_profile_header";
import UserProfileheaderLoader from "@/components/user_profile_header_loader";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

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

    const { data, loading, refetch } = useFetchData(`${APP_BASE_URL}/user/${user_id}`, user_id);

    const user: IProfileUser = { ...data };

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
                {loading && <UserProfileheaderLoader />}
                <section className="search-page max-w-[910px] w-full mx-auto">
                    {!loading &&
                        <FeedCoverPicture isAuthUser={isAuthUser} user={user} refetchUserData={refetch} />
                    }

                    <div className="relative px-[0px] lg:px-[32px] -mt-[50px]">
                        {!loading &&
                            <div className={`${styles.profile_header} mb-[10px] lg:mb-[20px] bg-neutral-90 border-neutral-86 rounded-[8px] px-[16px] pt-[20px]`}>
                                <UserProfileheader user_id={user_id} isAuthUser={isAuthUser} refetchUserData={refetch} user={user} />

                                <div className="bg-neutral-86 h-[1px] w-full my-[20px]"></div>

                                <div className="nav-wrapper flex gap-[16px]">
                                    <Link href={`/profile/${user_id}/feed`} className={`${styles.nav} ${currentPath == 'feed' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Feed</Link>
                                    <Link href={`/profile/${user_id}/friends`} className={`${styles.nav} ${currentPath == 'friends' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Friends</Link>
                                    <Link href={`/profile/${user_id}/photos`} className={`${styles.nav} ${currentPath == 'photos' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Photos</Link>
                                </div>
                            </div>
                        }

                        <div className="main-wrapper flex lg:flex-row gap-[12px]">
                            {children}
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}
