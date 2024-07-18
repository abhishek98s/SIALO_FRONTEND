"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import Story from "@/components/story";
import { IStory } from "@/model";
import styles from './story_list.module.scss';
import Link from "next/link";


export default function StoriesList() {
    const [open, setOpen] = useState(false);

    const storyRef = useRef(null);

    const onOpenmodal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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
        name: 'Dial'
    },]
    return (
        <>
            <section className={`${styles.stories_list_wrapper} my-[16px]`}>
                <Modal open={open}
                    onClose={onCloseModal}
                    center
                    container={storyRef.current}
                    classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                    }}
                >
                    <h2 className="heading-line text-[16px] font-bold color-primary-10 mb-[36px]">Post a story</h2>

                    <div className={`${styles.image_choose_wrapper} relative rounded-4 h-[126px] mb-[16px]`}>
                        <input type="file" className="absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full opacity-0 cursor-pointer" />
                        <div className="absolute top-0 left-0 right-0 bottom-0 z-1 bg-neutral-90 border-dotted border-spacing-1 border-1 flex flex-col items-center justify-center">
                            <figure className="mb-[8px]">
                                <Image src="/add-image.png" alt="add-image" width={40} height={40} />
                            </figure>
                            <span className="text-[14px] color-primary-45">Click to add image</span>
                        </div>
                    </div>

                    <div className="action-wrapper text-[14px]">
                        <button className="rounded-4 bg-primary-60 color-primary-80 font-bold px-[20px] py-[6px] mr-[12px]">Post</button>
                        <button className="rounded-4 color-neutral-60 font-bold px-[20px] py-[6px]">Cancel</button>
                    </div>
                </Modal>

                <ul className="stories-list">
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

                        <button className={`${styles.post_story_btn} mr-[12px]`} onClick={onOpenmodal}>
                            <SplideSlide>
                                <div className={`post_story-btn flex w-[90px] h-[120px] gradient-white border-primary-60 rounded-4`} >
                                    <Image className="m-auto max-w-[32px] w-full h-auto" src="/icons/add-story.svg" alt={'icon-story'} width={0} height={0} />
                                </div>
                            </SplideSlide>
                        </button>


                        {stories.map((story) => {
                            return (
                                <Link href={`/`} className="my-1 mr-[12px]">
                                    <SplideSlide key={story.id}>
                                        <Story story={story} />
                                    </SplideSlide>
                                </Link>
                            )
                        })}

                        {stories.map((story) => {
                            return (
                                <Link href={`/`} className="my-1 mr-[12px]">
                                    <SplideSlide key={story.id}>
                                        <Story story={story} />
                                    </SplideSlide>
                                </Link>

                            )
                        })}

                    </Splide>
                </ul>
            </section>
        </>
    );
}
