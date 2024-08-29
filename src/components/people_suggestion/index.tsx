import { APP_BASE_URL } from "@/utils/app";
import { axiosInterceptor } from "@/utils/axois.config";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";

interface IPeople {
    _id: string,
    name: string,
    img: string,
}

const PeopleSuggestion = () => {
    const [peopleList, setPeopleList] = useState<IPeople[]>([]);
    const axiosInstance = axiosInterceptor();

    const getchPoeplList = async () => {
        const response = await axiosInstance.get(`${APP_BASE_URL}/user/recommendation`);

        const { status, data } = response.data;

        setPeopleList(data);
    }

    useEffect(() => {
        getchPoeplList();
        console.log(peopleList)
    }, [])

    return (
        <div className="people-suggestion-wrapper max-w-[250px] w-full fixed top-[80px] right-[12px] border-neutral-80 rounded-8 px-[12px] pt-[20px] pb-[8px]">
            <div className="title-wrapper heading-line h-[24px] pb-[12px] mb-[32px] font-bold text-[16px] color-primary-10">People you may know</div>

            <ul className="people-list-wrapper mb-[12px] space-y-[12px]">
                {peopleList.map((people: IPeople, index) => (
                    <li key={index} className="flex items-center">
                        <Link href={`/profile/${people._id}/feed`} className="focus-visible-primary-45 rounded-4">
                            <div className="flex items-center">
                                <figure className="rounded-full mr-[12px]">
                                    <Image src={people.img} alt={`user`} className="object-cover rounded-full border-primary-60" width={30} height={30} />
                                </figure>

                                <span className="text-[16px] color-primary-10">{people.name}</span>
                            </div>
                        </Link>

                        <button className="ml-auto focus-visible-primary-45 rounded-4">
                            <figure className="max-w-[32px] w-full h-[32px] flex-center p-[8px]">
                                <Image src={`/icons/icon-add.svg`} width={24} height={24} alt="icon-add-friend"></Image>
                            </figure>
                        </button>
                    </li>
                ))}

            </ul>

            <Link href="/search" className="block txt-focus color-primary-60 text-[14px] text-center">View more</Link>
        </div>
    )
};

export default PeopleSuggestion;
