'use client';

import ImageListPreview from "@/components/image_list-preview";
import { Feed } from "@/components/feed";
import { IFeed } from "@/types/home.types.";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { setFeed } from "@/lib/features/feed.slice";
import { profile_feed_arr } from "@/seed_data/profile_feed.seed";
import { axiosInterceptor } from "@/utils/axois.config";
import { APP_BASE_URL } from "@/utils/app";
import { useParams } from "next/navigation";
import FeedLoader from "@/components/feed_loader";

export default function ProfilePage() {

    const [userFeed, setUserFeed] = useState([]);
    const dispatch = useAppDispatch();
    const axiosInstance = axiosInterceptor();

    const { user_id } = useParams();

    const getFeed = async () => {
        const response = await axiosInstance.get(`${APP_BASE_URL}/post/${user_id}`);

        const { status, data } = response.data;

        setUserFeed(data)
    }

    useEffect(() => {
        getFeed();
    }, [])

    return (
        <>
            <div role="feed_information" className="w-full space-y-[12px]">
                {userFeed.length === 0 && <FeedLoader />}
                {userFeed.map((feed, index) => (
                    <Feed getFeed={getFeed} isHome={true} feed_data={feed} key={index} />
                ))}
            </div>
            <ImageListPreview />
        </>
    )
}
