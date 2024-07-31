'use client';

import Feed from "@/components/feed";
import StoriesList from "@/components/story_list";
import UserPostBox from "@/components/user_post_box";
import HomeLayout from "../layout";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function IndexPage() {
    const counter = useAppSelector((state) => state.counter.value); // Return Root State Slices
    const dispatch = useAppDispatch(); // Action Dispatcher
    
    
    return (
        <>
            <HomeLayout>
                <div className="container max-w-[500px] mx-auto">
                    <StoriesList />
                    <UserPostBox />

                    <section className="feed-list space-y-[16px] pb-[85px] lg:pb-[12px]">
                        <Feed />
                        <Feed />
                        <Feed />
                    </section>
                </div>
            </HomeLayout>
        </>
    );
}
