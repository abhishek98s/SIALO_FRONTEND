import Image from "next/image";

import styles from './story_preview.module.scss';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCurrentIndex, closeStoryModal, populateStories, populateUserProfile, setNextUserId } from "@/lib/features/story.slice";
import { useCallback, useEffect, useRef, useState } from "react";

export default function StoryPreview() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.story.userProfile);
    const story_list = useAppSelector((state) => state.story.story_list);
    const isOpen = useAppSelector((state) => state.story.isOpen);

    const [index, setindex] = useState<number>(0);

    const userStoriesArr = useAppSelector((state) => state.story.stories);
    const nextUserId = useAppSelector((state) => state.story.nextUserId);
    const currentIndex = useAppSelector((state) => state.story.nextUserId);

    const story = userStoriesArr[index];

    const StoryModalRef = useRef<HTMLElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

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

    const onNextClick = (e: any) => {
        e.stopPropagation();
        dispatch(setNextUserId(user.userId))

        if (index < userStoriesArr.length - 1) {
            setindex(index + 1);
        } else if (!nextUserId) {
            dispatch(closeStoryModal())
        } else {
            const newUserStory = story_list[1];
            dispatch(populateUserProfile({
                userId: newUserStory.user_id,
                userName: newUserStory.user_name,
                userImage: newUserStory.user_image,
            }))
            dispatch(populateStories(newUserStory.stories));
        }
    }
    const onPrevClick = () => {
        if (index > 0) {
            setindex(index - 1);
        }
    }

    return (
        <div className="overlay fixed overflow-hidden z-[9999] flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-black/60">
            <button ref={prevRef} onClick={onPrevClick} className="opacity-0 lg:opacity-100 -translate-y-1/2 absolute z-10 top-1/2 bottom-0 left-0 max-w-[80px] w-full flex-center h-[80%]">
                <figure>
                    <Image className="h-full object-contain" src="/icons/icon-left.svg" alt="icon-left" width={48} height={48} />
                </figure>
            </button>

            <section ref={StoryModalRef} className="relative sm:w-[450px] min-h-[550px] h-[100%] sm:h-[95vh] border-neutral-80 backdrop-blur-[12px] rounded-8 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 z-10 flex justify-between header p-[12px]">
                    <div className="flex items-center gap-[8px]">
                        <figure className="rounded-full overflow-hidden border-primary-60">
                            <Image src={user.userImage} alt="user-2" width={40} height={40} />
                        </figure>

                        <div className="">
                            <div className="name text-[16px] font-bold">{user.userName}</div>
                            <div className="date text-[12px]">May 10, 2024</div>
                        </div>
                    </div>

                    <div className="flex">
                        <button className={`${styles.icon_button} w-[40px] h-[40px] rounded-full overflow-hidden flex-center`}>
                            <Image src="/icons/icon-more-menu.svg" alt="" width={24} height={24} />
                        </button>

                        <button onClick={closeModalCallback} className={`${styles.icon_button} w-[40px] h-[40px] rounded-full overflow-hidden p-[12px] flex-center`}>
                            <Image src="/icons/icon-close.svg" alt="icon-close" width={24} height={24} />
                        </button>
                    </div>
                </div>

                <Image className="w-full h-full object-cover" src={story.story_image} alt={story.caption} width={500} height={0} />
                <div className={`${styles.liner_overlay} absolute top-0 bottom-0 left-0 right-0 z-4`}></div>

                <div className={`${styles.caption} backdrop-blur-[4px] absolute bottom-0 left-0 right-0 text-center leading-[1.5] text-[16px] bg-black/20 rounded-8 p-[14px]`}>
                    {story.caption}
                </div>
            </section>

            <button ref={nextRef} onClick={onNextClick} className="opacity-0 lg:opacity-100 -translate-y-1/2 absolute z-10 top-1/2 bottom-0 right-0 max-w-[80px] w-full flex-center h-[80%]">
                <figure>
                    <Image className="h-full object-contain" src="/icons/icon-right.svg" alt="icon-right" width={48} height={48} />
                </figure>
            </button>
        </div>
    )
}
