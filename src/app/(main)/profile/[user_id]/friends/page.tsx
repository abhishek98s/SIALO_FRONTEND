import { Friend } from "@/components/friend";
import { IFriend } from "@/types/profile";


export default function Friends() {
    const friends_list: IFriend[] = [
        {
            name: 'Gustavo Bergson',
            image: '/user.png',
        },

        {
            name: 'Anika Bator',
            image: '/user-2.png',
        },

        {
            name: 'Livia Ekstrom Bothman',
            image: '/user-3.png',
        },

        {
            name: 'Giana Kenter',
            image: '/user-4.png',
        },
        {
            name: 'Gustavo Bergson',
            image: '/user.png',
        },

        {
            name: 'Anika Bator',
            image: '/user-2.png',
        },

        {
            name: 'Livia Ekstrom Bothman',
            image: '/user-3.png',
        },

        {
            name: 'Giana Kenter',
            image: '/user-4.png',
        },
        {
            name: 'Gustavo Bergson',
            image: '/user.png',
        },

        {
            name: 'Anika Bator',
            image: '/user-2.png',
        },

        {
            name: 'Livia Ekstrom Bothman',
            image: '/user-3.png',
        },

        {
            name: 'Giana Kenter',
            image: '/user-4.png',
        },
        {
            name: 'Gustavo Bergson',
            image: '/user.png',
        },

        {
            name: 'Anika Bator',
            image: '/user-2.png',
        },

        {
            name: 'Livia Ekstrom Bothman',
            image: '/user-3.png',
        },

        {
            name: 'Giana Kenter',
            image: '/user-4.png',
        },
        {
            name: 'Gustavo Bergson',
            image: '/user.png',
        },

        {
            name: 'Anika Bator',
            image: '/user-2.png',
        },

        {
            name: 'Livia Ekstrom Bothman',
            image: '/user-3.png',
        },

        {
            name: 'Giana Kenter',
            image: '/user-4.png',
        },
        {
            name: 'Gustavo Bergson',
            image: '/user.png',
        },

        {
            name: 'Anika Bator',
            image: '/user-2.png',
        },

        {
            name: 'Livia Ekstrom Bothman',
            image: '/user-3.png',
        },

        {
            name: 'Giana Kenter',
            image: '/user-4.png',
        },
    ]
    return (
        <>
            <div className="friends-list-wrapper w-full">
                <div className="lg:grid grid-cols-4">
                    {friends_list.map((friend: IFriend, index: number) => (
                        <Friend friend={friend} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}
