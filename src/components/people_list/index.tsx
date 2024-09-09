import React from 'react';

import { Splide, SplideSlide } from "@splidejs/react-splide";

import { APP_BASE_URL } from "@/utils/app";
import useFetchData from "@/custom_hook/fetchdata.hook";
import { ISearchPeople } from '@/types/search_people';

import { PeopleSearch } from "../people_search";
import PeopleListLoader from "../people_list_loader";

export function PeopleList() {

    const { data } = useFetchData(`${APP_BASE_URL}/user/recommendation`)


    return (
        <>
            <h3 className="text-[20px] font-bold mb-[12px] color-primary-60">People you may know</h3>

            <div className="people-list">
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
                    {data.map((people: ISearchPeople, index: number) => (
                        <SplideSlide key={index}>
                            <PeopleSearch people={people} />
                        </SplideSlide>
                    ))}
                    {data.length == 0 && < PeopleListLoader />}
                </Splide>
            </div>
        </>
    )
}
