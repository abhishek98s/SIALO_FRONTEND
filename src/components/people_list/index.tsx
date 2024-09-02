import { Splide, SplideSlide } from "@splidejs/react-splide";
import { PeopleSearch } from "../people_search";
import { useCallback, useEffect, useState } from "react";
import { axiosInterceptor } from "@/utils/axois.config";
import useFetchData from "@/custom_hook/fetchdata.hook";
import { APP_BASE_URL } from "@/utils/app";
import PeopleListLoader from "../people_list_loader";

export function PeopleList() {
    const axiosInstance = axiosInterceptor();
    const people_list = [
        {
            id: "1",
            name: "Gustavo Bergson",
            imgUrl: "/user.png",
        },

        {
            id: "2",
            name: "Anika Bator",
            imgUrl: "/user-5.png",
        },

        {
            id: "3",
            name: "Livia Ekstrom Bothman",
            imgUrl: "/user-2.png",
        },

        {
            id: "4",
            name: "Giana Kenter",
            imgUrl: "/user-3.png",
        },

        {
            id: "5",
            name: "Emery Geidt",
            imgUrl: "/user-4.png",
        },

        {
            id: "6",
            name: "Emery Geidt",
            imgUrl: "/user-5.png",
        },
    ];
    const { data, error, loading } = useFetchData(`${APP_BASE_URL}/user/recommendation`)


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
                    {data.map((people, index) => (
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
