'use client';

import { Friend } from "@/components/friend";
import { setFriends } from "@/lib/features/friends.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { friends_arr } from "@/seed_data/friends.seed";
import { IFriend } from "@/types/profiles.types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function Friends() {

    const user_friends_list: IFriend[] = useAppSelector((state) => state.friend.friend_list);
    const dispatch = useDispatch();

    useEffect(() => {
        const getFeed = () => {
            dispatch(setFriends(friends_arr))
        }

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
