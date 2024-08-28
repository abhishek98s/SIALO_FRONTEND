'use client';

import { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import toast from "react-hot-toast";

import StoriesList from "@/components/story_list";
import UserPostBox from "@/components/user_post_box";
import HomeLayout from "../layout";
import { IFeed } from "@/types/home.types.";
import { setFeed } from "@/lib/features/feed.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Feed } from "@/components/feed";
import StoryPreview from "@/components/story_preview";

import { toast_error_option } from "@/utils/toast";
import { axiosInterceptor } from "@/utils/axois.config";


export default function IndexPage() {
    const feed_list: IFeed[] = useAppSelector((state) => state.feed.feed_list);
    const dispatch = useAppDispatch();
    const isStoryModalOpen = useAppSelector((state) => state.story.isOpen);

    const getFeed = async () => {
        try {
            const axiosInstace = axiosInterceptor();
            const response = await axiosInstace.get('/api/post')

            const { status, data } = response.data;

            if (!status) throw new Error();

            dispatch(setFeed(data))
        } catch (error) {
            toast.error('Error receiving the post', toast_error_option);
        }
    }

    useEffect(() => {
        getFeed();
    }, [dispatch])

    return (
        <>
            <HomeLayout>
                <div className="container max-w-[500px] mx-auto">
                    {isStoryModalOpen && <StoryPreview />}
                    <StoriesList />
                    <UserPostBox />

                    <section className="feed-list space-y-[16px]">
                        <InfiniteScroll
                            dataLength={feed_list.length}
                            next={getFeed}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                            scrollThreshold={'80%'}
                        >
                            {feed_list.map((feed, index) => (
                                <Feed feed_data={feed} key={index} />
                            ))}
                        </InfiniteScroll>
                    </section>
                </div>
            </HomeLayout>
        </>
    );
}
