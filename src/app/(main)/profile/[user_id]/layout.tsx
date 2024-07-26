'use client';

import Image from "next/image";
import Link from "next/link";

import styles from './profile.module.scss';

import { usePathname } from 'next/navigation';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const length = pathname.split('/').length;
    const currentPath = pathname.split('/')[length - 1];

    return (
        <>
            <div className="pl-[230px]">
                <section className="search-page max-w-[910px] w-full mx-auto">
                    <Image src={`/banner.png`} width={900} height={250} alt={`banner`} className="w-full h-[200px] lg:h-auto rounded-b-[12px] border-neutral-80 object-cover object-center" />

                    <div className="relative px-[0px] lg:px-[32px] -mt-[50px]">
                        <div className={`${styles.profile_header} mb-[10px] lg:mb-[20px] bg-neutral-90 border-neutral-86 rounded-[8px] px-[16px] pt-[20px]`}>
                            <div className="flex items-center gap-[12px]" role="header">
                                <Image src={`/user.png`} width={60} height={60} alt={`user`} className="rounded-full border-primary-60" />
                                <h2 className="text-[24px] font-bold color-primary-60">Tyler Houston</h2>

                                <button className="primary-btn ml-auto max-w-[92px] w-full h-[32px] text-[14px] font-bold">Add Friend</button>
                            </div>

                            <div className="bg-neutral-86 h-[1px] w-full my-[20px]"></div>

                            <div className="nav-wrapper flex gap-[16px]">
                                <Link href={`/profile/${2}/feed`} className={`${styles.nav} ${currentPath == 'feed' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Feed</Link>
                                <Link href={`/profile/${2}/friends`} className={`${styles.nav} ${currentPath == 'friends' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Friends</Link>
                                <Link href={`/profile/${2}/photos`} className={`${styles.nav} ${currentPath == 'photos' ? styles.active : ''} relative block text-[14px] text-center w-[60px] h-[34px]`}>Photos</Link>
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
