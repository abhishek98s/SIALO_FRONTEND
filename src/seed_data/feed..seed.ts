import { IFeed } from "@/types/home.types.";

export const feed_arr: IFeed[] = [
    {
        id: 1,
        name: "GameOn23",
        user_image: "/user-4.png",
        caption: "Just beat Dark Souls for the 5th time! Still one of my favorite games of all time.",
        date: "January 1, 2022",
        post_image: "/dark-souls-screenshot.png",
        comments: [
            {
                id: 1,
                name: "NoScope90",
                user_image: "/user-4.png",
                comment_info: "Nice! I'm still trying to beat it for the first time",
            },
            {
                id: 1,
                name: "PvPGuru",
                user_image: "/user-3.png",
                comment_info: "Dark Souls is a classic. Have you tried Sekiro?",
            },
        ],
    },
    {
        id: 2,
        name: "NoScope90",
        user_image: "/user-2.png",
        caption: "Just built my new gaming PC and I'm loving the performance! Anyone have any recommendations for good FPS games?",
        date: "May 14, 2021",
        post_image: "/gaming-pc-build.png",
        comments: [
            {
                id: 1,
                name: "GameOn23",
                user_image: "/user-5.png",
                comment_info: "Nice build! You should totally check out Overwatch or Rainbow Six Siege",
            },
        ],
    },
    {
        id: 3,
        name: "PvPGuru",
        user_image: "/user-3.png",
        caption: "Just got my hands on the new PS5 and I'm loving the graphics! Has anyone else tried the new God of War game?",
        date: "November 20, 2020",
        post_image: "/ps5-unboxing.png",
        comments: [
            {
                id: 1,
                name: "GameOn23",
                user_image: "/user-5.png",
                comment_info: "Yeah, I've been playing it nonstop! The graphics are insane",
            },
            {
                id: 2,
                name: "NoScope90",
                user_image: "/user-2.png",
                comment_info: "I'm still waiting for my PS5 to arrive. Can't wait to try it out!",
            },
        ],
    },
    {
        id: 4,
        name: "GameOn23",
        user_image: "/user-5.png",
        caption: "Just beat The Last of Us Part II and I'm still reeling from the ending! Has anyone else finished it?",
        date: "October 25, 2020",
        post_image: "/last-of-us-part-2-screenshot.png",
        comments: [
            {
                id: 1,
                name: "PvPGuru",
                user_image: "/user-3.png",
                comment_info: "Yeah, I finished it last week. That ending though...",
            },
            {
                id: 2,
                name: "NoScope90",
                user_image: "/user-2.png",
                comment_info: "I'm still on my first playthrough. Don't spoil it for me!",
            },
        ],
    },
    {
        id: 5,
        name: "NoScope90",
        user_image: "/user-2.png",
        caption: "Just started playing Cyberpunk 2077 and I'm loving the open world! Has anyone else tried it?",
        date: "December 10, 2020",
        post_image: "/cyberpunk-2077-screenshot.png",
        comments: [
            {
                id: 1,
                name: "GameOn23",
                user_image: "/user-5.png",
                comment_info: "Yeah, I've been playing it nonstop! The open world is so immersive",
            },
            {
                id: 1,
                name: "PvPGuru",
                user_image: "/user-3.png",
                comment_info: "I'm still waiting for the bugs to get fixed. Heard it's a bit glitchy",
            },
        ],
    },
]
