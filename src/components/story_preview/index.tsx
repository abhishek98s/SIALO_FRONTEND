import Image from "next/image";

import styles from './story_preview.module.scss';
import { useAppDispatch } from "@/lib/hooks";
import { closeStoryModal, openStoryModal } from "@/lib/features/story.slice";

export default function StoryPreview() {
    const dispatch = useAppDispatch();

    const closeModal = () => dispatch(closeStoryModal());

    return (
        <div role="dialog" aria-modal="true" tabIndex={-1} className="overlay fixed overflow-hidden z-[9999] flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-black/60">
            <button className="absolute z-10 top-0 bottom-0 left-0 max-w-[80px] w-full flex-center  h-full">
                <figure>
                    <Image className="h-full object-contain" src="/icons/icon-left.svg" alt="icon-left" width={48} height={48} />
                </figure>
            </button>

            <section className="relative sm:w-[450px] min-h-[550px] h-[90vh] sm:h-[95vh] border-neutral-80 backdrop-blur-[12px] rounded-8 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 z-10 flex justify-between header p-[12px]">
                    <div className="flex items-center gap-[8px]">
                        <figure className="rounded-full overflow-hidden border-primary-60">
                            <Image src="/photo-2.png" alt="user-2" width={40} height={40} />
                        </figure>

                        <div className="">
                            <div className="name text-[16px] font-bold">Ruth Reed</div>
                            <div className="date text-[12px]">May 10, 2024</div>
                        </div>
                    </div>

                    <div className="flex">
                        <button className={`${styles.icon_button} w-[40px] h-[40px] rounded-full overflow-hidden flex-center`}>
                            <Image src="/icons/icon-more-menu.svg" alt="" width={24} height={24} />
                        </button>

                        <button onClick={closeModal} className={`${styles.icon_button} w-[40px] h-[40px] rounded-full overflow-hidden p-[12px] flex-center`}>
                            <Image src="/icons/icon-close.svg" alt="icon-close" width={24} height={24} />
                        </button>
                    </div>
                </div>

                <Image className="w-full h-full object-cover" src="/photo-4.png" alt="/image-4.png" width={500} height={0} />
                <div className={`${styles.liner_overlay} absolute top-0 bottom-0 left-0 right-0 z-4`}></div>

                <div className={`${styles.caption} backdrop-blur-[4px] absolute bottom-0 left-0 right-0 text-center leading-[1.5] text-[16px] bg-black/20 rounded-8 p-[14px]`}>
                    Natures view a stunning display of color and beutry that can satisfy your soul
                </div>
            </section>

            <button className="absolute z-10 top-0 bottom-0 right-0 max-w-[80px] w-full flex-center h-full">
                <figure>
                    <Image className="h-full object-contain" src="/icons/icon-right.svg" alt="icon-right" width={48} height={48} />
                </figure>
            </button>
        </div>
    )
}
