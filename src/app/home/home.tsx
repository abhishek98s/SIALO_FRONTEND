"use client";

import Feed from "@/components/Feed";
import StoriesList from "@/components/story_list";
import UserPostBox from "@/components/user_post_box";


export default function IndexPage() {
    return (
        <>
            <div className="container px-[8px] mx-auto">
                <StoriesList />
                <UserPostBox />
                <Feed/>
            </div>
        </>
    );
}
