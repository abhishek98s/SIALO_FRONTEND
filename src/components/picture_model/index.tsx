'use client';

import React, { MutableRefObject } from "react"
import Image from "next/image";

import styles from './picture_model.module.scss';

import toast from "react-hot-toast";
import Modal from "react-responsive-modal"

import { ImagePreview } from "../image_preview";
import { toast_error_option } from "@/utils/toast";
import { isImage } from "@/utils/file";

type PictureModalProps = {
    open: boolean,
    image: string,
    storyRef: MutableRefObject<Element | null>;
    onCloseModal: () => void;
    clearImage: () => void,
    setImage: any,
    refresh: any,
    submitPhoto: any,
    title: string,
    isLoading: boolean,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export const PictureModal: React.FC<PictureModalProps> = ({ open, onCloseModal, storyRef, image, clearImage, setImage, setFile, submitPhoto, isLoading, title }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target as HTMLInputElement;

        const file = value.files ? value.files![0] : null;

        if (!file || !isImage(file)) {
            toast.error('Image type should be .jpg, .png or .jpeg', toast_error_option);
        } else {
            const fileURL = URL.createObjectURL(file);
            setFile(file);
            setImage(fileURL);
        }
    }

    return (
        <>
            <Modal open={open}
                onClose={onCloseModal}
                center
                container={storyRef.current}
                classNames={{
                    modal: 'customModal',
                }}
            >
                <form onSubmit={submitPhoto}>

                    <h2 className="heading-line text-[16px] font-bold color-primary-10 mb-[36px]">{title ? title : 'Post a story'}</h2>

                    {image &&
                        <ImagePreview user_inputted_image_url={image}
                            clearImage={clearImage} />
                    }

                    {!image &&
                        <>
                            <div className={`${styles.image_choose_wrapper} relative rounded-4 h-[126px] mb-[16px]`}>
                                <input
                                    onChange={handleChange}
                                    id="story_image"
                                    accept=".png,.jpg,.jpeg"
                                    type="file" className="absolute top-0 left-0 right-0 bottom-0 z-1 h-full w-full cursor-pointer focus-visible:outline-sky-100 outline" />
                                <label htmlFor="story_image" className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-neutral-90 border-dotted border-spacing-1 border-1 flex flex-col items-center justify-center cursor-pointer">
                                    <figure className="mb-[8px]">
                                        <Image src="/add-image.png" alt="add-image" width={40} height={40} priority />
                                    </figure>
                                    <span className="text-[14px] color-primary-45">Click to add image</span>
                                </label>
                            </div>
                        </>}

                    <div className="action-wrapper text-[14px]">
                        <button type="submit" className="primary-btn rounded-4 bg-primary-60 color-primary-80 font-bold px-[20px] py-[6px] mr-[12px]" disabled={isLoading} onClick={submitPhoto}>{isLoading ? 'Posting...' : 'Post'}</button>
                        <button type="button" className="secondary-btn rounded-4 color-neutral-60 font-bold px-[20px] py-[6px]" onClick={onCloseModal}>Cancel</button>
                    </div>
                </form>

            </Modal>
        </>
    )
}
