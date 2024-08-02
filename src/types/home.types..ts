export interface IStory {
    id: number,
    img: string,
    name: string,
}

export interface IComment {
    id: number,
    name: string,
    user_image: string,
    comment_info: string,
}

export interface IFeed {
    id: number,
    user_name: string,
    user_image: string,
    description: string,
    date: string,
    post_image: string,
    comments: IComment[]
}

export interface IUserSuggest {
    id: string,
    name: string,
    user_image: string
}

