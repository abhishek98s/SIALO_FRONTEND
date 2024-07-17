"use client";

import Image from "next/image";
import { Splide, SplideSlide } from '@splidejs/react-splide';

import Story from "@/components/story";
import { IStory } from "@/model";


export default function StoriesList() {
    const stories: IStory[] = [{
        id: 1,
        img: '/story-2.png',
        name: 'Dial',
    },
    {
        id: 2,
        img: '/story-3.png',
        name: 'Dial',
    },
    {
        id: 3,
        img: '/story-4.png',
        name: 'Dial',
    },
    {
        id: 4,
        img: '/story-5.png',
        name: 'Dial'
    },]
    return (
        <>
            <section className="stories-list-wrapper my-[16px]">
                <ul className="stories-list">
                    <Splide
                        options={{
                            type: 'slide',
                            gap: '12px',
                            arrows: false,
                            pagination: false,
                            drag: 'free',
                            width: '100%',
                            snap: true,
                            autoWidth: true,
                        }}
                    >

                        <SplideSlide>
                            <div className="post_story flex w-[90px] h-[120px] gradient-white border-primary-60 rounded-4" >
                                <Image className="m-auto max-w-[32px] w-full h-auto" src="/icons/add-story.svg" alt={'icon-story'} width={0} height={0} />
                            </div>
                        </SplideSlide>


                        {stories.map((story) => {
                            return (
                                <SplideSlide key={story.id}>
                                    <Story story={story} />
                                </SplideSlide>
                            )
                        })}

                        {stories.map((story) => {
                            return (
                                <SplideSlide key={story.id}>
                                    <Story story={story} />
                                </SplideSlide>
                            )
                        })}

                    </Splide>
                </ul>
            </section>
        </>
    );
}
