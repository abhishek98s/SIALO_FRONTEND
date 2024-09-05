'use client';

import ImageListPreview from "@/components/image_list-preview";
import { Feed } from "@/components/feed";
import { APP_BASE_URL } from "@/utils/app";
import { useParams } from "next/navigation";
import FeedLoader from "@/components/feed_loader";
import useFetchData from "@/custom_hook/fetchdata.hook";
import { IFeed } from "@/types/home.types.";

export default function ProfilePage() {
    const { user_id } = useParams();

    const { data: userFeedList, error, loading, refetch } = useFetchData(`${APP_BASE_URL}/post/${user_id}`, user_id);

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
    )
}
