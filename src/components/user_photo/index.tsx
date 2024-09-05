import Image from "next/image"
import Link from "next/link"
import React from "react"

type UserPhoto_Props = {
    photo: {
        post_image: string,
    }
    imageRef: any,
    open: any
}

export const UserPhoto: React.FC<UserPhoto_Props> = ({ photo, imageRef, open }) => {
    return (
        <button onClick={open} className="block focus-visible-primary-45 rounded-4">
            <figure className="relative rounded-4 border-neutral-86 h-[150px]">
                <Image onClick={open} ref={imageRef} objectFit="cover" className="rounded-4 border-neutral-70" src={photo.post_image} fill={true} alt={photo.post_image} />
            </figure>
        </button>
    )
}
