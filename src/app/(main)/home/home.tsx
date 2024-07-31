'use client';

import Feed from "@/components/feed";
import StoriesList from "@/components/story_list";
import UserPostBox from "@/components/user_post_box";
import HomeLayout from "../layout";

export default function IndexPage() {
    
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
