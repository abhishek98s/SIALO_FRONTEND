import useFetchData from "@/custom_hook/fetchdata.hook";
import { APP_BASE_URL } from "@/utils/app";
import { axiosInterceptor } from "@/utils/axois.config";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IRequestedPeople {
    id: string,
    name: string,
    image: string
    fetchRequest?: () => void;
}

const ReuestedPeople: React.FC<IRequestedPeople> = ({ id, name, image, fetchRequest }) => {
    const axiosInstance = axiosInterceptor();
    const [isLoading, setLoading] = useState(false);

    const onAccept = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.patch(`${APP_BASE_URL}/user/friend/accept/${id}`)

            const { status, data, message } = response.data;

            if (!status) throw new Error();

            toast.success('Request Accepted', toast_sucess_option);
        } catch (error) {
            toast.error('Failed to accpet the request', toast_error_option);
        } finally {
            fetchRequest!();
            setLoading(false)
        }
    }

    const onReject = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.patch(`${APP_BASE_URL}/user/friend/reject/${id}`)

            const { status, data, message } = response.data;

            if (!status) throw new Error();

            toast.success('Request Rejected', toast_sucess_option);
        } catch (error) {
            toast.error('Failed to reject the request', toast_error_option);
        } finally {
            fetchRequest!();
            setLoading(false)
        }
    }

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

                <button onClick={onAccept} className="ms-auto m-w-[150px] px-[8px] py-[6px] text-[14px] primary-btn focus-visible-primary-45 rounded-8">
                    {isLoading ? 'Accepting...' : 'Accept'}
                </button>
                <button onClick={onReject} className="ms-[4px] m-w-[150px] px-[8px] py-[6px] text-[14px] error-btn focus-visible-primary-45 rounded-8">
                    {isLoading ? 'Rejecting...' : 'Reject'}
                </button>
            </li>
        </>
    )
}

const FriendRequestList = () => {
    const { data: friendRequestList, error, loading, refetch } = useFetchData(`${APP_BASE_URL}/user/friendRequests`);

    return (
        <>
            {friendRequestList.length !== 0 &&
                <section className="friend_request_list mb-[32px]">
                    <h3 className="text-[20px] font-bold mb-[12px] color-primary-60">Friend Requests</h3>

                    <ul className="space-y-[8px]">
                        {friendRequestList.map((people: IRequestedPeople, index: number) => (
                            <ReuestedPeople fetchRequest={refetch} key={index} id={people.id} name={people.name} image={people.image} />
                        ))}
                    </ul>
                </section>
            }
        </>
    )
};


export default FriendRequestList;
