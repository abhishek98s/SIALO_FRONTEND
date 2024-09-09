import React, { useState } from "react";
import Image from "next/image";

import styles from './search_box.module.scss';
import Link from "next/link";
import useFetchData from "@/custom_hook/fetchdata.hook";
import { APP_BASE_URL } from "@/utils/app";

import SearchFolder from "../search_loader";

interface IPeople {
    _id: string,
    name: string,
    img: string,
}

const SearchBox = () => {
    const [search, setSearch] = useState('');
    const { data, loading } = useFetchData(`${APP_BASE_URL}/user/search?=name=${encodeURIComponent(search)}`, search);


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    }

    const onUnFous = () => {
        setSearch('');
    }

    return (
        <div className="relative">
            <div className="search-box relative w-full h-[40px] mx-auto mb-[40px] lg:mb-[56px]">
                <input type="text"
                    onChange={onInputChange}
                    onBlur={onUnFous}
                    value={search ?? ''}
                    className="w-full h-full rounded-8 border-neutral-80 bg-neutral-86" />

                <button className="search rounded-full focus-visible-primary-45 absolute top-[50%] right-[8px] -translate-y-1/2 flex-center max-w-[40px] w-full h-[40px]">
                    <Image src='/icons/icon-search.svg' width={15} height={15} alt="icon-search" />
                </button>
            </div>
            {search &&
                <div className="absolute left-0 right-0 top-[100%] mt-4 rounded-8 z-10 bg-neutral-88 border-neutral-80 p-2">
                    {loading && <SearchFolder />}

                    {!loading && data.map((people: IPeople, index: number) => (
                        <Link key={index} href={`/profile/${people._id}/feed`} className="block rounded-4 focus-visible-primary-45">
                            <div className={`${styles.user_wrapper} flex items-center gap-[16px] py-[12px] px-[20px]`}>
                                <figure className="rounded-full max-w-[40px] h-[40px]">
                                    <Image className="rounded-full border-primary-60 object-cover" src={people.img ? people.img : '/icons/icon-user.svg'} alt='user' width={40} height={40} />
                                </figure>

                                <span className="color-primary-10 text-[14px]">{people.name}</span>
                            </div>
                        </Link>
                    ))}

                    {!loading && data.length === 0 &&
                        <div className={`${styles.user_wrapper} flex items-center gap-[16px] py-[12px] px-[20px] color-primary-10 text-[14px]`}>
                            No result found
                        </div>
                    }
                </div>
            }

        </div>
    )
};


export default SearchBox;
