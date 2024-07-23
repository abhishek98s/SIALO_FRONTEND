"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import toast, { Toaster } from 'react-hot-toast';

import Story from "@/components/story";
import { IStory } from "@/model";
import styles from './story_list.module.scss';
import { toast_duration, toast_error_option, toast_sucess_option } from "@/utils/toast";


export default function StoriesList() {
    const [open, setOpen] = useState(false);

    const storyRef = useRef(null);

    const onOpenmodal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const onStoryPost = () => {
        toast.success('Story Posted', toast_sucess_option);
        onCloseModal();
    };

    const stories: IStory[] = [{
        id: 1,
        img: '/story-2.png',
        name: 'Dial',
    },
    {
        id: 2,
        img: '/story-3.png',
        name: 'Dial',
    },
    {
        id: 3,
        img: '/story-4.png',
        name: 'Dial',
    },
    {
        id: 4,
        img: '/story-5.png',
        name: 'Dial',
    }]
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

                    <div className={`${styles.image_choose_wrapper} relative rounded-4 h-[126px] mb-[16px]`}>
                        <input id="story_image" type="file" className="absolute top-0 left-0 right-0 bottom-0 z-1 h-full w-full cursor-pointer focus-visible:outline-sky-100 outline" />
                        <label htmlFor="story_image" className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-neutral-90 border-dotted border-spacing-1 border-1 flex flex-col items-center justify-center">
                            <figure className="mb-[8px]">
                                <Image src="/add-image.png" alt="add-image" width={40} height={40} priority />
                            </figure>
                            <span className="text-[14px] color-primary-45">Click to add image</span>
                        </label>
                    </div>

                    <div className="action-wrapper text-[14px]">
                        <button className="primary-btn rounded-4 bg-primary-60 color-primary-80 font-bold px-[20px] py-[6px] mr-[12px]" onClick={onStoryPost}>Post</button>
                        <button className="secondary-btn rounded-4 color-neutral-60 font-bold px-[20px] py-[6px]" onClick={onCloseModal}>Cancel</button>
                    </div>
                </Modal>

                <ul className="stories-list px-[12px]">
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


                        {stories.map((story) => {
                            return (
                                <SplideSlide key={story.id}>
                                    <Story story={story} />
                                </SplideSlide>)
                        })}

                        {stories.map((story) => {
                            return (
                                <SplideSlide key={story.id}>
                                    <Story story={story} />
                                </SplideSlide>
                            )
                        })}

                        {stories.map((story) => {
                            return (
                                <SplideSlide key={story.id}>
                                    <Story story={story} />
                                </SplideSlide>
                            )
                        })}
                    </Splide>
                </ul>
            </section>
        </>
    );
}
