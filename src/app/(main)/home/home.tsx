'use client';

import { useCallback, useEffect } from "react";
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
import FeedLoader from "@/components/feed_loader";
import useFetchData from "@/custom_hook/fetchdata.hook";
import { axiosInterceptor } from "@/utils/axois.config";
import { APP_BASE_URL } from "@/utils/app";
import PeopleSuggestion from "@/components/people_suggestion";


export default function IndexPage() {
    const feed_list: IFeed[] = useAppSelector((state) => state.feed.feed_list);
    const isStoryModalOpen = useAppSelector((state) => state.story.isOpen);
    const { data: post_list, error, loading } = useFetchData('/api/post');
    const dispatch = useAppDispatch();


    const getFeed = useCallback(async () => {
        try {
            const axiosInstance = axiosInterceptor();
            const response = await axiosInstance.get(`${APP_BASE_URL}/post/random?noOfPosts=10`)
            const { status, data } = response.data;

            dispatch(setFeed(data));
        } catch (error) {
            toast.error('Error receiving the post', toast_error_option);
        }
    }, [post_list, dispatch]);

    useEffect(() => {
        getFeed();
    }, [post_list, getFeed])


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
                            loader={<FeedLoader />}
                            scrollThreshold={'80%'}
                        >
                            {feed_list.map((feed, index) => (
                                <Feed feed_data={feed} key={index} />
                            ))}
                        </InfiniteScroll>
                    </section>
                </div>
                <PeopleSuggestion />
            </HomeLayout>
        </>
    );
}
