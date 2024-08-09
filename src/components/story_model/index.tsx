'use client';

import React, { MutableRefObject } from "react"
import Modal from "react-responsive-modal"
import Image from "next/image";

import styles from './story_model.module.scss';

import { ImagePreview } from "../image_preview";

type StoryModalProps = {
    open: boolean,
    image: string,
    storyRef: MutableRefObject<Element | null>;
    onCloseModal: () => void;
    clearImage: () => void,
    onStoryPost: () => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const StoryModal: React.FC<StoryModalProps> = ({ open, onCloseModal, storyRef, image, clearImage, handleChange, onStoryPost }) => {
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
                <h2 className="heading-line text-[16px] font-bold color-primary-10 mb-[36px]">Post a story</h2>

                {image &&
                    <ImagePreview user_inputted_image_url={image}
                        clearImage={clearImage} />
                }

                {!image &&

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
                    </div>}

                <div className="action-wrapper text-[14px]">
                    <button className="primary-btn rounded-4 bg-primary-60 color-primary-80 font-bold px-[20px] py-[6px] mr-[12px]" onClick={onStoryPost}>Post</button>
                    <button className="secondary-btn rounded-4 color-neutral-60 font-bold px-[20px] py-[6px]" onClick={onCloseModal}>Cancel</button>
                </div>
            </Modal>
        </>
    )
}
