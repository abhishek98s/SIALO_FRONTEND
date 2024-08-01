'use client';

import StoriesList from "@/components/story_list";
import UserPostBox from "@/components/user_post_box";
import HomeLayout from "../layout";
import { IFeed } from "@/types/home.types.";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFeed } from "@/lib/features/feed.slice";
import { feed_arr } from "@/seed_data/feed..seed";
import { useAppSelector } from "@/lib/hooks";
import { Feed } from "@/components/feed";

export default function IndexPage() {
    const feed_list: IFeed[] = useAppSelector((state) => state.feed.feed_list);
    const dispatch = useDispatch();
    console.log(feed_list)

    useEffect(() => {
        const getFeed = () => {
            dispatch(setFeed(feed_arr))
        }

        getFeed();
    }, [dispatch])


    return (
        <>
            <HomeLayout>
                <div className="container max-w-[500px] mx-auto">
                    <StoriesList />
                    <UserPostBox />

                    <section className="feed-list space-y-[16px]">
                        {feed_list.map((feed, index) => (
                            <Feed feed_data={feed} key={index} />
                        ))}
                    </section>
                </div>
            </HomeLayout>
        </>
    );
}
