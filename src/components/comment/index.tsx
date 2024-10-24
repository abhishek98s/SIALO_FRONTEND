import Image from "next/image";
import Link from "next/link";
import React from "react";

type Comment_Propes = {
    comment: {
        name: string;
        comment_info: string;
        img: string;
    }
}

export const Comment: React.FC<Comment_Propes> = ({ comment }) => {
    return (
        <>
            <div className="comment flex gap-[8px] mb-[20px]">
                <Link href={`/`} className="max-w-[30px] rounded-full focus-visible-primary-45 h-[30px] w-full block">
                    <Image src={comment.img} alt='user' width={40} height={40} priority className="w-full border-primary-60 rounded-full" />
                </Link>
                <div className="comment-info">
                    <Link href={`/`} className="txt-focus">
                        <h6 className="color-neutral-40 mb-[4px] text-[14px]">{comment.name}</h6>
                    </Link>

                    <p className="color-neutral-20 leading-[1.3] text-[14px]">{comment.comment_info}</p>
                </div>
            </div>
        </>
    )
}
