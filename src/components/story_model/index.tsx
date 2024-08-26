'use client';

import React, { MutableRefObject, useState } from "react"
import Modal from "react-responsive-modal"
import Image from "next/image";

import styles from './story_model.module.scss';

import { ImagePreview } from "../image_preview";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";
import { isImage } from "@/utils/file";
import toast from "react-hot-toast";
import { axiosInterceptor } from "@/utils/axois.config";

type StoryModalProps = {
    open: boolean,
    image: string,
    storyRef: MutableRefObject<Element | null>;
    onCloseModal: () => void;
    clearImage: () => void,
    setImage: any,
}

export const StoryModal: React.FC<StoryModalProps> = ({ open, onCloseModal, storyRef, image, clearImage, setImage }) => {

    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

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

    const handleCaption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaption(e.target.value);
    }

    const onStoryPost = async () => {
        try {
            setIsLoading(true);

            if (!image || !caption) {
                setIsLoading(false);
                toast.error('image and caption is required', toast_error_option);
                return;
            }

            const form_data = new FormData();
            form_data.append('caption', caption);
            form_data.append('sialo_story_image', file!);


            const axiosInstace = axiosInterceptor();
            const response = await axiosInstace.post('/api/story', form_data)

            const { status, data } = response.data;

            if (!status) throw Error('Error posting the story');
            setIsLoading(false);
            toast.success('Story Posted', toast_sucess_option);
            onCloseModal();
            setImage('');
        } catch (error) {
            setIsLoading(false);
            const err_message = (error as Error).message;
            toast.error(err_message, toast_error_option);
        }
    };

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
                <form onSubmit={onStoryPost}>

                    <h2 className="heading-line text-[16px] font-bold color-primary-10 mb-[36px]">Post a story</h2>

                    <input className="bg-neutral-90 rounded-4 mb-[8px] text-[14px] h-[40px]" type="text" placeholder="Caption for story" onChange={handleCaption} />

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
                        <button type="submit" className="primary-btn rounded-4 bg-primary-60 color-primary-80 font-bold px-[20px] py-[6px] mr-[12px]" disabled={isLoading} onClick={onStoryPost}>{isLoading ? 'Posting...' : 'Post'}</button>
                        <button className="secondary-btn rounded-4 color-neutral-60 font-bold px-[20px] py-[6px]" onClick={onCloseModal}>Cancel</button>
                    </div>
                </form>

            </Modal>
        </>
    )
}
