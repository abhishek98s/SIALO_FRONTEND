import Image from "next/image";
import Link from "next/link";

import style from './feed.module.scss';
import { ReactElement, useState } from "react";
import { Comment } from "../comment";
import toast from "react-hot-toast";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";

type IComment = {
    name: string,
    comment_info: string,
    img: string,
}

export default function Feed() {
    const [isLiked, setIsLiked] = useState(false);
    const [comment, setComment] = useState<string | null>(null);

    const comments = [
        {
            name: 'Arlene Ferguson',
            comment_info: 'From the rolling hills of a countryside landscape to the majestic peaks of a mountain range, nature\'s view can take your breath away.',
            img: '/user.png',
        },
        {
            name: 'Arlene Ferguson',
            comment_info: 'From the rolling hills of a countryside landscape to the majestic peaks of a mountain range, nature\'s view can take your breath away.',
            img: '/user.png',
        },
    ]

    function likePost() {
        setIsLiked(!isLiked);
    }

    const handleChange = (e: any) => {
        const value = e.target.value;
        setComment(value)
    }

    const submitComment = (e: any) => {
        e.preventDefault();

        if (!comment) {
            toast.error('comment is rquired', toast_error_option);
            return
        }
        toast.success('Comment Posted', toast_sucess_option);
    }
    return (
        <article className={`${style.feed_wrapper} border-neutral-86 px-[12px] pt-[20px] pb-[8px] bg-neutral-90 rounded-8`}>
            <header className="mb-[12px]">
                <div className="user-info flex items-center gap-[8px]">
                    <Link href={'/profile/2/feed'} className="block rounded-full focus-visible-primary-45">
                        <Image src={`/user.png`} alt='user' width={40} height={40} priority className="max-w-[40px] h-[40px] w-full border-primary-60 rounded-full" />
                    </Link>
                    <div className="info">
                        <Link href={'/profile/2/feed'} className=" txt-focus color-primary-60 text-[14px] font-bold leading-normal hover:underline underline-offset-1">Ruth Reed</Link>
                        <div className="color-primary-10 text-[12px]">May 10, 2024</div>
                    </div>

                    <Link href=":" className={`${style.more_menu} flex-center ml-auto max-w-[40px] w-full h-[40px] flex-center`}>
                        <svg className={`transition-all`} width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="3" height="3" rx="1.5" fill="#666666" />
                            <rect x="6.5" y="0.5" width="3" height="3" rx="1.5" fill="#666666" />
                            <rect x="12.5" y="0.5" width="3" height="3" rx="1.5" fill="#666666" />
                        </svg>
                    </Link>
                </div>
            </header>
            <p className="text-[14px] mb-[12px]">Nature&aposs view, a stunning display of color and beauty that can rejuvenate your soul</p>

            <figure className="relative w-full h-auto border-neutral-86 mb-[16px]">
                <Image src={`/post-image.png`} alt='post-image'
                    width={0} height={0} className="w-full h-auto" sizes="100vw" />
            </figure>

            <div className="interaction-wrapper flex items-center gap-[8px] mb-[32px]">
                <button onClick={likePost} className={`${style.like} ${isLiked ? style.active : ""} cursor-pointer max-w-[40px] w-full h-[40px] flex-center`}>
                    <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.7851 15.4033L17.3567 24.8333C16.7316 25.4582 15.8839 25.8093 15.0001 25.8093C14.1162 25.8093 13.2685 25.4582 12.6434 24.8333L3.21505 15.405C2.43567 14.6324 1.81656 13.7135 1.39327 12.701C0.969974 11.6885 0.750836 10.6023 0.748433 9.5049C0.74603 8.40749 0.96041 7.3204 1.37926 6.30606C1.79812 5.29171 2.4132 4.37009 3.18919 3.5941C3.96518 2.8181 4.88681 2.20302 5.90115 1.78417C6.91549 1.36532 8.00258 1.15094 9.09999 1.15334C10.1974 1.15574 11.2835 1.37488 12.296 1.79817C13.3085 2.22147 14.2275 2.84058 15.0001 3.61996C16.5693 2.08975 18.6783 1.2394 20.8701 1.25314C23.0619 1.26687 25.16 2.14357 26.71 3.69333C28.26 5.24309 29.137 7.34111 29.151 9.53291C29.1651 11.7247 28.315 13.8338 26.7851 15.4033Z" stroke="#A7DC74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <form className="comment-wrapper relative flex-grow" onSubmit={submitComment}>
                    <input type="text" placeholder="Have something to say"
                        onChange={handleChange}
                        className="bg-neutral-88 rounded-full border-neutral-86 h-[44px] w-full p-[12px] pl-[16px]" />
                    <button
                        onClick={submitComment}
                        type="submit" className={`${style.comment_post_btn} rounded-full w-[40px] h-[40px] flex-center absolute right-[6px] top-1/2 -translate-y-1/2`}>
                        <Image src={`/icons/icon-send.svg`} alt="icon-comment" width={17} height={17} className="cursor-pointer" />
                    </button>
                </form>
            </div>

            <div className="comment-wrapper">
                <h3 className="color-primary-50 text-[14px] font-bold mb-[12px]">Comments</h3>

                <div className="comment-list">
                    {comments.map((comment, index) => (
                        <Comment comment={comment} key={index} />
                    ))}
                </div>
            </div>
        </article>
    )
}
