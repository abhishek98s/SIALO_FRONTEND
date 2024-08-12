import Image from "next/image";
import Link from "next/link";

import styles from './story.module.scss';
import { IStory } from "@/types/home.types.";

interface StoryProps {
    story: IStory,
    img_ref: any,
    open: any
}


export default function Story({ story, img_ref, open }: StoryProps) {
    return (
        <button onClick={open} className={`${styles.stories_wrapper} block w-full mb-1 mr-[12px]`}>
            <div className="story h-[120px] border-neutral-80 rounded-4">
                <Image onClick={open} objectFit="cover" ref={img_ref} src={story.storyImage} alt='story.img' width={400} height={500} priority className="w-full h-full object-cover rounded-4" />
            </div>
        </button>
    )
}
