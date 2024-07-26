import { UserPhoto } from "@/components/user_photo";

export default function PhotoPage() {
    const photo_list = [
        {
            image_url: '/photo-4.png',
        },

        {
            image_url: '/photo-2.png',
        },

        {
            image_url: '/photo-3.png',
        },

        {
            image_url: '/photo-4.png',
        },

        {
            image_url: '/photo-5.png',
        },

        {
            image_url: '/photo-1.png',
        },
        {
            image_url: '/photo-4.png',
        },

        {
            image_url: '/photo-2.png',
        },

        {
            image_url: '/photo-3.png',
        },

        {
            image_url: '/photo-4.png',
        },

        {
            image_url: '/photo-5.png',
        },

        {
            image_url: '/photo-1.png',
        },
        {
            image_url: '/photo-4.png',
        },

        {
            image_url: '/photo-2.png',
        },

        {
            image_url: '/photo-3.png',
        },

        {
            image_url: '/photo-4.png',
        },

        {
            image_url: '/photo-5.png',
        },

        {
            image_url: '/photo-1.png',
        },    
    ];

    return (
        <>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-[12px] w-full">
                {photo_list.map((photo, index) => (
                    <UserPhoto photo={photo} key={index} />
                ))}
            </section>
        </>
    )
}
