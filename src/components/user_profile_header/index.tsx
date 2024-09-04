import Image from "next/image";
import React, { useRef, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { StoryModal } from "../story_model";
import { PictureModal } from "../picture_model";
import toast from "react-hot-toast";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";
import { axiosInterceptor } from "@/utils/axois.config";
import { APP_BASE_URL } from "@/utils/app";

interface IUser {
    user: {
        _id: string,
        img: string,
        name: string,
        isFriend: boolean
    },
    onFriendRequestSent: () => void,
    refetchUserData: () => void

}

const UserProfileheader: React.FC<IUser> = ({ user, onFriendRequestSent, refetchUserData }) => {
    const [file, setFile] = useState<File | null>(null);

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string>('');
    const storyRef = useRef(null);
    const clearImage = () => {
        setImage('')
    }

    const onOpenmodal = () => setOpen(true);

    const onCloseModal = () => {
        setOpen(false);
        setImage('');
    }

    const onImageSubmit = async (e: any) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            if (!file) {
                setIsLoading(false);
                toast.error('image is required', toast_error_option);
                return;
            }

            const form_data = new FormData();
            form_data.append('sialo_cover_image', file!);


            const axiosInstace = axiosInterceptor();
            const response = await axiosInstace.post(`${APP_BASE_URL}/user/profilePicture`, form_data)

            const { status, data } = response.data;

            if (!status) throw Error('Error posting the story');
            setIsLoading(false);
            toast.success('Profile Picture Updated', toast_sucess_option);
            onCloseModal();
            refetchUserData();
            setImage('');
        } catch (error) {
            setIsLoading(false);
            const err_message = (error as Error).message;
            toast.error(err_message, toast_error_option);
            onCloseModal()
        }
    }

    return (
        <div className="flex items-center gap-[20px]" role="header">
            <PictureModal title="Update profile picture" submitPhoto={onImageSubmit} refresh={refetchUserData} open={open} onCloseModal={onCloseModal} storyRef={storyRef} image={image} clearImage={clearImage} setImage={setImage} />

            <Gallery>
                <Item
                    original={user?.img ? user?.img : '/icons/icon-user.svg'}
                    thumbnail={user?.img ? user?.img : '/icons/icon-user.svg'}
                    width="400"
                    height="550"
                >
                    {({ ref, open }) => (
                        <div className="relative">
                            <Image ref={ref} onClick={open} src={user?.img ? user?.img : '/icons/icon-user.svg'} width={60} height={60} alt={`user`} className="rounded-full border-primary-60" />
                            <button onClick={onOpenmodal} className="scale_on_hover absolute right-0 bottom-0 flex-center rounded-full focus-visible-primary-45 p-[12px] bg-neutral-90 translate-x-[10px] translate-y-[10px]">
                                <Image src='/icons/icon-edit.svg' className="" alt="icon-edit" width={16} height={16} />
                            </button>
                        </div>
                    )}
                </Item>
            </Gallery>

            <h2 className="text-[24px] font-bold color-primary-60">{user?.name}</h2>

            {user.isFriend === false && <button onClick={onFriendRequestSent} className="primary-btn ml-auto max-w-[92px] w-full h-[32px] text-[14px] font-bold">Add Friend</button>}
        </div>
    )
};

export default UserProfileheader;
