'use client';

import { PeopleList } from "@/components/people_list";
import Image from "next/image";

export default function SearchPage() {

    return (
        <>
            <section className="search-page pt-[56px]  w-full px-[8px] mx-auto pb-[102px] lg:pb-[56px] lg:px-[24px]">
                <div className="search-box relative max-w-[450px] w-full h-[40px] mx-auto mb-[40px] lg:mb-[56px]">
                    <input type="text" className="w-full h-full rounded-full border-neutral-80 bg-neutral-86" />

                    <button className="search rounded-full focus-visible-primary-45 absolute top-[50%] right-[8px] -translate-y-1/2 flex-center max-w-[40px] w-full h-[40px]">
                        <Image src='/icons/icon-search.svg' width={15} height={15} alt="icon-search" />
                    </button>
                </div>

                <PeopleList />
            </section>
        </>
    )
}
