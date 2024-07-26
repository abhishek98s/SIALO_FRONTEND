import Image from "next/image"
import Link from "next/link"
import React from "react"

type UserPhoto_Props = {
    photo: {
        image_url: string,
    }
}

export const UserPhoto: React.FC<UserPhoto_Props> = ({ photo }) => {
    return (
        <Link href={`/`} className="block focus-visible-primary-45 rounded-4">
            <figure className="relative rounded-4 border-neutral-86 h-[150px]">
                <Image objectFit="cover" src={photo.image_url} fill={true} alt={photo.image_url} />
            </figure>
        </Link>
    )
}
