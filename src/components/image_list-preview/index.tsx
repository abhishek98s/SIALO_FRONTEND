import Image from "next/image";
import Link from "next/link";

export default function ImageListPreview() {
    return (
        <div className="image-wrapper hidden lg:block max-w-[240px] w-full rounded-4 border-neutral-96 bg-neutral-90 p-[12px] pt-[20px] h-fit">
            <h4 className="heading-line font-bold text-[14px] color-primary-60 mb-[32px]">Photos</h4>

            <div className="image-list flex flex-wrap gap-[8px] mb-[8px]">
                <figure className="rounded-4 border-neutral-86 max-w-[100px] w-full h-[100px] relative">
                    <Image className="w-full h-auto" src={`/story-2.png`} priority fill={true} alt="user" />
                </figure>

                <figure className="rounded-4 border-neutral-86 max-w-[100px] w-full h-[100px] relative">
                    <Image className="w-full h-auto" src={`/story-2.png`} priority fill={true} alt="user" />
                </figure>

                <figure className="rounded-4 border-neutral-86 max-w-[100px] w-full h-[100px] relative">
                    <Image className="w-full h-auto" src={`/story-2.png`} priority fill={true} alt="user" />
                </figure>

                <figure className="rounded-4 border-neutral-86 max-w-[100px] w-full h-[100px] relative">
                    <Image className="w-full h-auto" src={`/story-2.png`} priority fill={true} alt="user" />
                </figure>
            </div>

            <Link href={`/profile/photos`} className="text-center txt-focus block text-[14px] mx-auto color-primary-60">view more</Link>
        </div>
    )
}
