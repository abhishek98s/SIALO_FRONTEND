"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import toast, { Toaster } from 'react-hot-toast';

import Story from "@/components/story";
import styles from './story_list.module.scss';
import { toast_error_option, toast_sucess_option } from "@/utils/toast";
import { isImage } from "@/utils/file";
import { ImagePreview } from "../image_preview";
import { IStory } from "@/types/home.types.";
import { useDispatch } from "react-redux";
import { setStory } from "@/lib/features/story.slice";
import { stories_arr } from "@/seed_data/story.seed";
import { useAppSelector } from "@/lib/hooks";

import 'photoswipe/dist/photoswipe.css'

import { Gallery, Item } from 'react-photoswipe-gallery'



export default function StoriesList() {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string>('');
    const storyRef = useRef(null);

    const dispatch = useDispatch();
    const story_list = useAppSelector((state) => state.story.story_list)
    useEffect(() => {
        const getStories = () => {
            dispatch(setStory(stories_arr))
        }
        getStories();
    }, [])

    const clearImage = () => {
        setImage('')
    }

    const onOpenmodal = () => setOpen(true);

    const onCloseModal = () => {
        setOpen(false);
        setImage('');
    }
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

    const onStoryPost = () => {
        if (!image) {
            toast.error('image is required', toast_error_option);
            return;
        }
        toast.success('Story Posted', toast_sucess_option);
        setImage('');
        onCloseModal();
    };


    return (
        <>
            <section className={`${styles.stories_list_wrapper} my-[16px] overflow-y-scroll`}>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={{
                        className: 'toast_notification',
                        success: { ...toast_sucess_option },
                        error: { ...toast_error_option },
                    }}
                />
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

                <ul className="stories-list px-[12px] lg:px-[0px]">
                    <Splide
                        options={{
                            type: 'slide',
                            gap: '12px',
                            arrows: false,
                            pagination: false,
                            drag: 'free',
                            width: '100%',
                            snap: true,
                            autoWidth: true,
                        }}
                    >

                        <SplideSlide>
                            <button className={`${styles.post_story_btn} mr-[12px]`} onClick={onOpenmodal}>
                                <div className={`post_story-btn flex w-[90px] h-[120px] gradient-white border-primary-60 rounded-4`} >
                                    <Image className="m-auto max-w-[32px] w-full h-auto" src="/icons/add-story.svg" alt={'icon-story'} width={0} height={0} />
                                </div>
                            </button>
                        </SplideSlide>
                        <Gallery>
                            {story_list.map((story) => {
                                return (
                                    <SplideSlide key={story.id}>
                                        <Item
                                            original={story.img}
                                            thumbnail={story.img}
                                            width="400"
                                            height="550"
                                        >
                                            {({ ref, open }) => (
                                                <Story img_ref={ref} open={open} story={story} />
                                            )}
                                        </Item>
                                    </SplideSlide>)
                            })}
                        </Gallery>
                    </Splide>
                </ul>
            </section >
        </>
    );
}
