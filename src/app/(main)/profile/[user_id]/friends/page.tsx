"use client";

import React from "react";
import { useParams } from "next/navigation";

import { APP_BASE_URL } from "@/utils/app";
import { IFriend } from "@/types/profiles.types";
import useFetchData from "@/custom_hook/fetchdata.hook";

import { Friend } from "@/components/friend";
import FriendLoader from "@/components/friend_loader";

export default function Friends() {
  const { user_id } = useParams();
  const { data: user_friends_list, loading } = useFetchData(
    `${APP_BASE_URL}/user/friends/${user_id}`
  );

  return (
    <>
      <div className="friends-list-wrapper w-full">
        <div className="lg:grid grid-cols-4 gap-[4px]">
          {user_friends_list.map((friend: IFriend, index: number) => (
            <Friend friend={friend} key={index} />
          ))}

          {loading && <FriendLoader />}
        </div>
      </div>
    </>
  );
}
