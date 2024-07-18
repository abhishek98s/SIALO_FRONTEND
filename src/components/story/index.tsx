import Image from "next/image";

import { IStory } from "@/model";
import Link from "next/link";

interface StoryProps {
    story: IStory;
}

export default function ({ story }: StoryProps) {
    return (
        <div className="story h-[120px] border-neutral-86">
            <Image className="object-cover h-full w-full rounded-4" src={story.img} alt="asd" width={90} height={120} />
        </div>
    )
}
