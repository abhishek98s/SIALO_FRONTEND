"use client";

import Feed from "@/components/Feed";
import StoriesList from "@/components/story_list";
import UserPostBox from "@/components/user_post_box";


export default function IndexPage() {
    return (
        <>
            <div className="container mx-auto">
                <StoriesList />
                <UserPostBox />

                <section className="feed-list space-y-[16px] pb-[85px]">
                    <Feed />
                    <Feed />
                    <Feed />
                </section>
            </div>
        </>
    );
}
