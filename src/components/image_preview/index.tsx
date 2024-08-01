import Image from 'next/image'
import React, { Component } from 'react'

import styles from './image_preview.module.scss';


type ImageProps = {
    user_inputted_image_url: string;
    clearImage: () => void;
}
export const ImagePreview: React.FC<ImageProps> = ({ user_inputted_image_url, clearImage }) => {
    return (
        <div className={`${styles.middle} relative rounded-4 border-neutral-40 w-[60px] h-[60px] mb-[16px]`}>
            <Image className="rounded-4 object-cover h-full w-full" src={user_inputted_image_url} width={60} height={60} alt={`image`} />
            <button type="button"
                onClick={clearImage}
                className={`focus-visible-primary-65 rounded-4 opacity-60 w-full h-full bg-neutral-90 position-center flex-center`}>
                <Image src={`/icons/icon-close.svg`} width={17} height={17} alt="icon-close" />
            </button>
        </div>
    )
}
