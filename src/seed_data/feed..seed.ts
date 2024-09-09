import { IFeed } from "@/types/home.types.";

export const feed_arr: IFeed[] = [
    {
        userId: "1",
        name: "GameOn23",
        user_image: "/user-4.png",
        caption: "Just beat Dark Souls for the 5th time! Still one of my favorite games of all time.",
        post_image: "/dark-souls-screenshot.png",
        createdAt: "January 1, 2022",
        isLiked: true,
        likes: ['2', '2'],
        comments: [
            {
                user_id: 1,
                comment_user_name: "NoScope90",
                comment_user_picture: "/user-4.png",
                comment: "Nice! I am still trying to beat it for the first time",
            },
            {
                user_id: 2,
                comment_user_name: "PvPGuru",
                comment_user_picture: "/user-3.png",
                comment: "Dark Souls is a classic. Have you tried Sekiro?",
            },
        ],
    },
    {
        userId: "2",
        name: "NoScope90",
        user_image: "/user-2.png",
        caption: "Just built my new gaming PC and Im loving the performance! Anyone have any recommendations for good FPS games?",
        createdAt: "January 1, 2022",
        isLiked: true,
        likes: ['2', '2'],
        post_image: "/gaming-pc-build.png",
        comments: [
            {
                user_id: 1,
                comment_user_name: "GameOn23",
                comment_user_picture: "/user-5.png",
                comment: "Nice build! You should totally check out Overwatch or Rainbow Six Siege",
            },
        ],
    },
    {
        userId: "3",
        name: "PvPGuru",
        user_image: "/user-3.png",
        caption: "Just got my hands on the new PS5 and Im loving the graphics! Has anyone else tried the new God of War game?",
        createdAt: "January 1, 2022",
        isLiked: true,
        likes: ['2', '2'],
        post_image: "/ps5-unboxing.png",
        comments: [
            {
                user_id: 1,
                comment_user_name: "GameOn23",
                comment_user_picture: "/user-5.png",
                comment: "Yeah, Ive been playing it nonstop! The graphics are insane",
            },
            {
                user_id: 2,
                comment_user_name: "NoScope90",
                comment_user_picture: "/user-2.png",
                comment: "Im still waiting for my PS5 to arrive.Cant wait to try it out!",
            },
        ],
    },
    {
        userId: "4",
        name: "GameOn23",
        user_image: "/user-5.png",
        caption: "Just beat The Last of Us Part II and Im still reeling from the ending! Has anyone else finished it?",
        createdAt: "January 1, 2022",
        isLiked: true,
        likes: ['2', '2'],
        post_image: "/last-of-us-part-2-screenshot.png",
        comments: [
            {
                user_id: 1,
                comment_user_name: "PvPGuru",
                comment_user_picture: "/user-3.png",
                comment: "Yeah, I finished it last week. That ending though...",
            },
            {
                user_id: 2,
                comment_user_name: "NoScope90",
                comment_user_picture: "/user-2.png",
                comment: "Im still on my first playthrough.Dont spoil it for me!",
            },
        ],
    },
    {
        userId: "5",
        name: "NoScope90",
        user_image: "/user-2.png",
        caption: "Just started playing Cyberpunk 2077 and Im loving the open world! Has anyone else tried it?",
        createdAt: "January 1, 2022",
        isLiked: true,
        likes: ['2', '2'],
        post_image: "/cyberpunk-2077-screenshot.png",
        comments: [
            {
                user_id: 1,
                comment_user_name: "GameOn23",
                comment_user_picture: "/user-5.png",
                comment: "Yeah, Ive been playing it nonstop! The open world is so immersive",
            },
            {
                user_id: 1,
                comment_user_name: "PvPGuru",
                comment_user_picture: "/user-3.png",
                comment: "Im still waiting for the bugs to get fixed.Heard its a bit glitchy",
            },
        ],
    },
]
