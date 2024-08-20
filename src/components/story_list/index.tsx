"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Dor Model
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import toast, { Toaster } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStory } from "@/lib/features/story.slice";

import Story from "@/components/story";
import { StoryModal } from "@/components/story_model";

import styles from './story_list.module.scss';

import { toast_error_option, toast_sucess_option } from "@/utils/toast";

// for the gallary or pop up image
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
import axios from "axios";



export default function StoriesList() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<string>('');
    const storyRef = useRef(null);

    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const story_list = useAppSelector((state) => state.story.story_list)

    useEffect(() => {
        const getStories = async () => {
            try {
                const response = await axios.get('/api/story', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { status, data } = response.data;
                console.log(data)

                if (!status) throw new Error();

                dispatch(setStory(data))

            } catch (error) {
                toast.error('Error fetching story', toast_error_option);
            }
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

                <StoryModal open={open} onCloseModal={onCloseModal} storyRef={storyRef} image={image} clearImage={clearImage} setImage={setImage} />

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
                            {story_list.map((story, index) => {
                                return (
                                    <SplideSlide key={index}>
                                        <Item
                                            original={story.stories[0].story_image}
                                            thumbnail={story.stories[0].story_image}
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
