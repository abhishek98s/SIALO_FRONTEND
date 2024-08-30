import { APP_BASE_URL } from "@/utils/app";
import { axiosInterceptor } from "@/utils/axois.config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IRequestedPeople {
    id: string,
    name: string,
    image: string
}

const ReuestedPeople: React.FC<IRequestedPeople> = ({ id, name, image }) => {
    return (
        <>
            <li className="flex items-center border-neutral-80 rounded-8 p-[8px]">
                <Link href={`profile/${id}/feed`} className="focus-visible-primary-45 rounded-4 p-1">
                    <div className="flex items-center">
                        <figure className="max-w-[40px] mr-[10px] h-[40px] w-full">
                            <Image src={image ? image : '/icons/icon-user.svg'} className="rounded-full object-cover h-full border-primary-60" alt={`user`} width={40} height={40} />
                        </figure>

                        <div className="name text-[14px] color-primary-10">{name}</div>
                    </div>
                </Link>

                <button className="ms-auto m-w-[150px] px-[8px] py-[6px] text-[14px] primary-btn focus-visible-primary-45 rounded-8">
                    Accept
                </button>
                <button className="ms-[4px] m-w-[150px] px-[8px] py-[6px] text-[14px] error-btn focus-visible-primary-45 rounded-8">
                    Reject
                </button>
            </li>
        </>
    )
}

const FriendRequestList = () => {
    const [friendRequestList, setFriendRequestList] = useState([]);

    const fetchFriendRequests = async () => {
        const axiosInstance = axiosInterceptor();
        const resposne = await axiosInstance.get(`${APP_BASE_URL}/user/friendRequests`)

        const { status, data } = resposne.data;
        console.log(data)

        setFriendRequestList(data);
    }

    useEffect(() => {
        fetchFriendRequests();
    }, [])

    return (
        <>
            {friendRequestList.length !== 0 &&
                <section className="friend_request_list mb-[32px]">
                    <h3 className="text-[20px] font-bold mb-[12px] color-primary-60">Friend Requests</h3>

                    <ul className="space-y-[8px]">
                        {friendRequestList.map((people: IRequestedPeople, index) => (
                            <ReuestedPeople key={index} id={people.id} name={people.name} image={people.image} />
                        ))}
                    </ul>
                </section>
            }
        </>
    )
};


export default FriendRequestList;
