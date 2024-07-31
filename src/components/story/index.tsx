import Image from "next/image";
import Link from "next/link";

import styles from './story.module.scss';
import { IStory } from "@/types/home";

interface StoryProps {
    story: IStory;
}

export default function Story({ story }: StoryProps) {
    return (
        <Link href={`/`} className={`${styles.stories_wrapper} block w-full mb-1 mr-[12px]`}>
            <div className="story h-[120px] border-neutral-86">
                <Image src={story.img} alt='story.img' width={90} height={120} priority className="rounded-4" />
            </div>
        </Link>
    )
}
