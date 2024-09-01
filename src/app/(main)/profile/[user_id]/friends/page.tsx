'use client';

import { Friend } from "@/components/friend";
import { setFriends } from "@/lib/features/friends.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { friends_arr } from "@/seed_data/friends.seed";
import { IFriend } from "@/types/profiles.types";
import { APP_BASE_URL } from "@/utils/app";
import { axiosInterceptor } from "@/utils/axois.config";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


export default function Friends() {

    const user_friends_list: IFriend[] = useAppSelector((state) => state.friend.friend_list);
    const dispatch = useDispatch();
    const axiosInstance = axiosInterceptor();
    const { user_id } = useParams();

    const getFeed = async () => {
        try{

            const response = await axiosInstance(`${APP_BASE_URL}/user/friends/${user_id}`);
            
            const { status, data } = response.data;
            
            if(!status) throw new Error();
            
            dispatch(setFriends(data))
        }catch(error){
            toast.error('Error getting friends', toast_error_option);
        }
    }

    useEffect(() => {

        getFeed();
    }, [dispatch])

    return (
        <>
            <div className="friends-list-wrapper w-full">
                <div className="lg:grid grid-cols-4 gap-[4px]">
                    {user_friends_list.map((friend: IFriend, index: number) => (
                        <Friend friend={friend} key={index} /> 
                    ))}
                </div>
            </div>
        </>
    )
}
