export interface IStoryObject {
    id?: number,
    user_id: string,
    user_name: string,
    user_image: string,
    stories: IStory[]
}

export interface IStory {
    story_id: string,
    story_image: string,
    caption: string,
}

export interface IComment {
    user_id: number,
    comment_user_picture: string,
    comment_user_name: string,
    comment: string,
}

export interface IFeed {
    id: number,
    userId: string
    name: string,
    user_image: string,
    caption: string,
    post_image: string,
    likes: string[],
    comments: IComment[],
    createdAt: 'string',
}

export interface IUserSuggest {
    id: string,
    name: string,
    user_image: string
}

