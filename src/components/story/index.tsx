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
            <div className="story h-[120px] border-neutral-86">
                <Image onClick={open} objectFit="cover" ref={img_ref} src={story.img} alt='story.img' width={90} height={120} priority className="rounded-4" />
            </div>
        </button>
    )
}
