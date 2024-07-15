import Image from "next/image";
import Link from "next/link";

import style from './feed.module.scss';

export default function Feed() {
    return (
        <article className={`${style.feed_wrapper} border-neutral-86 bg-neutral-90 px-[12px] py-[20px]`}>
            <header>
                <div className="user-info flex items-center gap-[8px]">
                    <Image src={`/user.png`} alt='user' width={40} height={40} priority className="max-w-[40px] h-[40px] w-full border-primary-60 rounded-full" />
                    <div className="info">
                        <div className="color-primary-60 text-[14px] font-bold leading-normal">Ruth Reed</div>
                        <div className="color-primary-10 text-[12px]">May 10, 2024</div>
                    </div>

                    <Link href=":" className="more_menu flex-center ml-auto max-w-[40px] w-full h-[40px] flex-center">
                        <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="3" height="3" rx="1.5" fill="#666666" />
                            <rect x="6.5" y="0.5" width="3" height="3" rx="1.5" fill="#666666" />
                            <rect x="12.5" y="0.5" width="3" height="3" rx="1.5" fill="#666666" />
                        </svg>
                    </Link>
                </div>
            </header>
        </article>
    )
}