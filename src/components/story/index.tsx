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
            <div className="story relative h-[120px] border-neutral-80 overflow-hidden rounded-4">
                <Image onClick={open} objectFit="cover" ref={img_ref} src={story.story_image} alt='story.img' width={400} height={500} priority className="w-full h-full object-cover rounded-4" />
                <div className="absolute top-0 bottom-0 right-0 left-0 z-30 bg-black/40"></div>
                <figure className="absolute top-[4px] left-[4px] z-50 rounded-full overflow-hidden border-primary-60 w-[32px] h-[32px]">
                    <Image src={story.story_image} alt={story.caption} width={40} height={40} />
                </figure>
            </div>
        </button>
    )
}
