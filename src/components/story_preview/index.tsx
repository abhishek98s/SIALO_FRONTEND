import React from 'react';
import Image from "next/image";

import styles from './story_preview.module.scss';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeStoryModal, setUsersId } from "@/lib/features/story.slice";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";
import { axiosInterceptor } from "@/utils/axois.config";
import { APP_BASE_URL } from "@/utils/app";
import useFetchData from "@/custom_hook/fetchdata.hook";
import StoryLoader from "../story_loader";

export default function StoryPreview() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.story.isOpen);

    const userObjectId = useAppSelector((state) => state.auth.user?.id);

    const [index, setindex] = useState<number>(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const nextUserId = useAppSelector((state) => state.story.nextUserId);
    const previousUserId = useAppSelector((state) => state.story.previousUserId);
    const currentUserId = useAppSelector((state) => state.story.currentUserId);

    const { data: userStories, loading } = useFetchData(`${APP_BASE_URL}/story/${currentUserId}`, currentUserId);

    const story = userStories[index];

    const StoryModalRef = useRef<HTMLElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        console.log('changed')

    }, [userStories])

    const closeModalCallback = useCallback(() => {
        dispatch(closeStoryModal())
        setindex(0)
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen &&
                !StoryModalRef.current?.contains(event.target as Node) &&
                !nextRef.current?.contains(event.target as Node) &&
                !prevRef.current?.contains(event.target as Node)
            ) {
                closeModalCallback();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [StoryModalRef, closeModalCallback, isOpen]);

    const onNextClick = async (e: any) => {
        e.stopPropagation();

        if (index < userStories.length - 1) {
            setindex(index + 1);
        } else if (!nextUserId) {
            setindex(0);
            closeModalCallback();
        } else {
            try {
                console.log(nextUserId)
                dispatch(setUsersId(nextUserId));

                setindex(0);
            } catch (error) {
                closeModalCallback();
            }
        }
    }

    const onPreviousClick = async (e: any) => {
        e.stopPropagation();

        if (index > 0) {
            setindex(index - 1);
        } else if (!previousUserId) {
            setindex(0);
            closeModalCallback();
        } else {
            try {
                dispatch(setUsersId(previousUserId));

                setindex(userStories.length - 1);
            } catch (error) {
                closeModalCallback();
            }
        }
    }


    const toggleMoreMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const onDeleteClick = async () => {
        try {
            setIsLoading(true);
            const axiosInstace = axiosInterceptor();
            const response = await axiosInstace.delete('/api/story', {
                params: {
                    id: story.story_id,
                },
            })

            const { status } = response.data.data;

            if (!status) throw new Error();

            toast.success('Story Deleted', toast_sucess_option);
            dispatch(closeStoryModal())
            toggleMoreMenu()
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error('Error deleting story', toast_error_option);
        }

    }

    return (
        <div className="overlay fixed overflow-hidden z-[9999] flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-black/60">
            <button ref={prevRef} onClick={onPreviousClick} className="opacity-0 lg:opacity-100 -translate-y-1/2 absolute z-10 top-1/2 bottom-0 left-0 max-w-[80px] w-full flex-center h-[80%]">
                <figure>
                    <Image loading='lazy' className="h-full object-contain" src="/icons/icon-left.svg" alt="icon-left" width={48} height={48} />
                </figure>
            </button>

            {loading && <StoryLoader closeModel={closeModalCallback} styles={styles} />}
            {userStories.length !== 0 && !loading &&
                <>

                    <section ref={StoryModalRef} className="flex-center relative sm:w-[450px] min-h-[550px] h-[100%] sm:h-[95vh] border-neutral-80 backdrop-blur-[12px] rounded-8 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between header p-[12px]">
                            <div className="flex items-center gap-[8px]">
                                <figure className="rounded-full overflow-hidden border-primary-60">
                                    <Image loading='lazy' className="h-[40px]" src={story.user_image} alt="user-2" width={40} height={40} />
                                </figure>

                                <div className="">
                                    <div className="name text-[16px] font-bold">{story.user_name}</div>
                                    <div className="date text-[12px]">{story.date}</div>
                                </div>
                            </div>

                            <div className="flex">
                                {userObjectId === story.user_id &&
                                    <div className="relative">
                                        <button onClick={toggleMoreMenu} className={`${styles.icon_button} w-[40px] h-[40px] rounded-full overflow-hidden flex-center`}>
                                            <Image loading='lazy' src="/icons/icon-more-menu.svg" alt="" width={24} height={24} />
                                        </button>

                                        {isMenuOpen && <div className={`${styles.more_btn_wrapper} absolute top-full right-0 backdrop-blur-[12px] bg-black/30 border-neutral-40 p-[2px] rounded-8`}>
                                            <ul className="w-[108px]">
                                                <li><button onClick={onDeleteClick} className="w-full text-left text-[14px] p-[6px] rounded-4 color-neutral-0 focus-visible-primary-45">{isLoading ? 'Delete...' : 'Delete'}</button></li>
                                            </ul>
                                        </div>}
                                    </div>
                                }

                                <button onClick={closeModalCallback} className={`${styles.icon_button} w-[40px] h-[40px] rounded-full overflow-hidden p-[12px] flex-center`}>
                                    <Image loading='lazy' src="/icons/icon-close.svg" alt="icon-close" width={24} height={24} />
                                </button>
                            </div>
                        </div>

                        <Image loading='lazy' className="relative z-10 w-full h-auto object-contain content-center" src={story.story_image} alt={story.caption} width={500} height={0} />
                        <Image loading='lazy' className="w-full h-full object-cover blur-[20px]" src={story.story_image} alt={story.caption} fill />
                        <div className={`${styles.liner_overlay} absolute top-0 bottom-0 left-0 right-0 z-4`}></div>

                        <div className={`${styles.caption} backdrop-blur-[4px] absolute bottom-0 left-0 right-0 text-center leading-[1.5] text-[16px] bg-black/20 rounded-8 p-[14px]`}>
                            {story.caption}
                        </div>
                    </section>

                </>
            }
            <button ref={nextRef} onClick={onNextClick} className="opacity-0 lg:opacity-100 -translate-y-1/2 absolute z-10 top-1/2 bottom-0 right-0 max-w-[80px] w-full flex-center h-[80%]">
                <figure>
                    <Image loading='lazy' className="h-full object-contain" src="/icons/icon-right.svg" alt="icon-right" width={48} height={48} />
                </figure>
            </button>
        </div >
    )
}
