import Image from "next/image";

import { IStory } from "@/model";

interface StoryProps {
    story: IStory;
}

export default function ({ story }: StoryProps) {
    return (
        <div className="story w-[90px] h-[120px] border-neutral-86 rounded-4">
            <Image className="object-cover h-full w-full" src={story.img} alt="asd" width={90} height={120} />
        </div>
    )
}
