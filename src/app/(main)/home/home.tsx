'use client';

import InfiniteScroll from 'react-infinite-scroll-component';

import StoriesList from "@/components/story_list";
import UserPostBox from "@/components/user_post_box";
import HomeLayout from "../layout";
import { IFeed } from "@/types/home.types.";
import { useAppSelector } from "@/lib/hooks";
import { Feed } from "@/components/feed";
import StoryPreview from "@/components/story_preview";
import FeedLoader from "@/components/feed_loader";
import useFetchData from "@/custom_hook/fetchdata.hook";
import { APP_BASE_URL } from "@/utils/app";
import PeopleSuggestion from "@/components/people_suggestion";


export default function IndexPage() {
    const isStoryModalOpen = useAppSelector((state) => state.story.isOpen);

    const { data: feed_list, error, loading, refetch } = useFetchData(`${APP_BASE_URL}/post/random?noOfPosts=3`);

    const getFeed = () => {
        refetch();
    };


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
                            {feed_list.map((feed: IFeed, index: number) => (
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
