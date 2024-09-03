'use client';

import FriendRequestList from "@/components/friend_request_list";
import { PeopleList } from "@/components/people_list";
import SearchBox from "@/components/search_box";
import Image from "next/image";

export default function SearchPage() {

    return (
        <>
            <section className="search-page pt-[56px] lg:pl-[230px] w-full px-[8px] mx-auto pb-[102px] lg:pb-[56px] lg:px-[24px]">
                <div className="max-w-[500px] w-full px-[8px] mx-auto absolute left-[50%] -translate-x-1/2">
                    <SearchBox/>

                    <FriendRequestList />

                    <PeopleList />
                </div>
            </section>
        </>
    )
}
