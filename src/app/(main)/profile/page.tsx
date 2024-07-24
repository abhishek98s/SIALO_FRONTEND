import Image from "next/image";
import Link from "next/link";

import styles from './profile.module.scss';
import Feed from "@/components/feed";

export default function ProfilePage() {

    return (
        <>
            <section className="search-page max-w-[970px] w-full mx-auto">
                <Image src={`/banner.png`} width={900} height={250} alt={`banner`} className="w-full h-[200px] lg:h-auto rounded-b-[12px] border-neutral-80 object-cover object-center" />

                <div className="relative px-[0px] lg:px-[32px] -mt-[50px]">
                    <div className={`${styles.profile_header} bg-neutral-90 border-neutral-86 rounded-[8px] px-[16px] pt-[20px]`}>
                        <div className="flex items-center gap-[12px]" role="header">
                            <Image src={`/user.png`} width={60} height={60} alt={`user`} className="rounded-full border-primary-60" />
                            <h2 className="text-[24px] font-bold color-primary-60">Tyler Houston</h2>

                            <button className="primary-btn ml-auto max-w-[92px] w-full h-[32px] text-[14px] font-bold">Add Friend</button>
                        </div>

                        <div className="bg-neutral-86 h-[1px] w-full my-[20px]"></div>

                        <div className="nav-wrapper flex gap-[16px]">
                            <Link href={`/`} className={`${styles.nav} ${styles.active} relative block text-[14px] text-center w-[60px] h-[34px]`}>About</Link>
                            <Link href={`/`} className={`${styles.nav} relative block text-[14px] text-center w-[60px] h-[34px]`}>Friends</Link>
                            <Link href={`/`} className={`${styles.nav} relative block text-[14px] text-center w-[60px] h-[34px]`}>Photos</Link>
                        </div>
                    </div>

                    <div role="feed_information">
                        <Feed />
                        <Feed />
                        <Feed />
                    </div>
                </div>
            </section>
        </>
    )
}
