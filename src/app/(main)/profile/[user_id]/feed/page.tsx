"use client";

import React from "react";

import { useParams } from "next/navigation";

import { APP_BASE_URL } from "@/utils/app";
import { IFeed } from "@/types/home.types.";
import useFetchData from "@/custom_hook/fetchdata.hook";
import ImageListPreview from "@/components/image_list-preview";
import FeedLoader from "@/components/feed_loader";
import { Feed } from "@/components/feedd";

export default function ProfilePage() {
  const { user_id } = useParams();

  const {
    data: userFeedList,
    loading,
    refetch,
  } = useFetchData(`${APP_BASE_URL}/post/${user_id}`, user_id);

  return (
    <>
      <div role="feed_information" className="w-full space-y-[12px]">
        {loading && <FeedLoader />}
        {userFeedList.map((feed: IFeed, index: number) => (
          <Feed getFeed={refetch} isHome={true} feed_data={feed} key={index} />
        ))}
      </div>
      <ImageListPreview />
    </>
  );
}
