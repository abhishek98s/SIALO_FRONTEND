import Image from "next/image";
import Link from "next/link";

import styles from './story.module.scss';
import { IStoryObject } from "@/types/home.types.";
import { useAppDispatch } from "@/lib/hooks";
import { closeStoryModal, openStoryModal, populateStories, setCurrentIndex, setNextUserId } from "@/lib/features/story.slice";
import { axiosInterceptor } from "@/utils/axois.config";
import { APP_BASE_URL } from "@/utils/app";

interface StoryProps {
    story: IStoryObject,
    img_ref: any,
    open: any
}


export default function Story({ story, img_ref, open }: StoryProps) {
    const dispatch = useAppDispatch();

    const openStory = async () => {
        try {

            const { user_name: userName, user_id, user_image: userImage, stories } = story;

            const axiosInstace = axiosInterceptor();
            const response = await axiosInstace.get(`${APP_BASE_URL}/story/${user_id}`);

            const { status, data } = response.data;

            if (!status) throw new Error();
            dispatch(setCurrentIndex(user_id))
            dispatch(populateStories(data));
            dispatch(setNextUserId(user_id));
            dispatch(openStoryModal());
        } catch (error) {
            dispatch(closeStoryModal());
        }
    }

    console.log(story.stories[0].story_image)
    return (
        <button onClick={openStory} className={`${styles.stories_wrapper} block w-full mb-1 mr-[12px]`}>
            <div className="story relative h-[120px] border-neutral-80 overflow-hidden rounded-4">
                <Image onClick={open} objectFit="cover" ref={img_ref} src={story.stories[0].story_image ? story.stories[0].story_image : '/icons/icon-user.svg'} alt='story.img' width={400} height={500} priority className="w-full h-full object-cover rounded-4" />
                <div className="absolute top-0 bottom-0 right-0 left-0 z-30 bg-black/40"></div>
                <figure className="absolute top-[4px] left-[4px] z-50 rounded-full overflow-hidden border-primary-60 w-[32px] h-[32px]">
                    <Image src={story.user_image ? story.user_image : '/icons/icon-user.svg'} alt={story.user_name} width={40} height={40} />
                </figure>
            </div>
        </button>
    )
}
