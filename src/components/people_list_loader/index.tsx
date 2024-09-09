import React from 'react';

import { SplideSlide } from "@splidejs/react-splide";


const PeopleListLoader = () => {
    const peopleArr = [1, 2, 3, 4]

    return (
        <>
            {peopleArr.map((item, index) => (
                <SplideSlide key={index}>
                    <article className={`people-wrapper flex flex-col max-w-[180px] min-h-[180px] w-full border-neutral-86 bg-neutral-88 rounded-8 px-[4px] pt-[16px] pb-[12px]`}>
                        <div className="loading-bg mx-auto max-w-[80px] w-full h-[80px] mb-[10px] rounded-full"></div>

                        <div className="loading-bg rounded-4 max-w-[100px] mb-[4px] w-full mx-auto h-[20px]"></div>

                        <div className="loading-bg w-full mx-auto mt-[16px] rounded-8 h-[30px]"></div>
                    </article>
                </SplideSlide>

            ))}
        </>
    )
}

export default PeopleListLoader;
