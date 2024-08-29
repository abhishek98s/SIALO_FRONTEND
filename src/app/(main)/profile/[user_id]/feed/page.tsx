'use client';

import ImageListPreview from "@/components/image_list-preview";
import { Feed } from "@/components/feed";
import { IFeed } from "@/types/home.types.";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { setFeed } from "@/lib/features/feed.slice";
import { profile_feed_arr } from "@/seed_data/profile_feed.seed";

export default function ProfilePage() {
    const user_feed_list: IFeed[] = useAppSelector((state) => state.feed.feed_list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getFeed = () => {
            dispatch(setFeed(profile_feed_arr))
        }

        getFeed();
    }, [dispatch])

    return (
        <>
            <div role="feed_information" className="space-y-[12px]">
                {user_feed_list.map((feed, index) => (
                    <Feed isHome={true} feed_data={feed} key={index} />
                ))}
            </div>
            <ImageListPreview />
        </>
    )
}
