import React, { useRef, useState } from "react";
import Image from "next/image";

import toast from "react-hot-toast";
import { Gallery, Item } from "react-photoswipe-gallery";

import { axiosInterceptor } from "@/utils/axois.config";
import { APP_BASE_URL } from "@/utils/app";
import { IProfileUser } from "@/types/home.types.";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";

import { PictureModal } from "../picture_model";
interface IUser {
  isAuthUser: boolean;
  user: IProfileUser;
  refetchUserData: () => void;
  user_id: string | string[];
}

const UserProfileheader: React.FC<IUser> = ({
  user,
  refetchUserData,
  user_id,
  isAuthUser,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string>("");
  const storyRef = useRef(null);
  const axiosInstance = axiosInterceptor();

  const clearImage = () => {
    setImage("");
  };

  const onOpenmodal = () => setOpen(true);

  const onCloseModal = () => {
    setOpen(false);
    setImage("");
  };

  const onImageSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!file) {
        setIsLoading(false);
        toast.error("image is required", toast_error_option);
        return;
      }

      const form_data = new FormData();
      form_data.append("sialo_profile_image", file!);

      const axiosInstace = axiosInterceptor();
      const response = await axiosInstace.patch(
        `${APP_BASE_URL}/user/profilePicture`,
        form_data
      );

      const { status } = response.data;

      if (!status) throw Error("Error posting the profile picture");
      setIsLoading(false);
      toast.success("Profile Picture Updated", toast_sucess_option);
      onCloseModal();
      refetchUserData();
      setImage("");
    } catch (error) {
      setIsLoading(false);
      const err_message = (error as Error).message;
      toast.error(err_message, toast_error_option);
      onCloseModal();
    }
  };

  const onFriendRequestSent = async () => {
    try {
      const response = await axiosInstance.patch(
        `${APP_BASE_URL}/user/friend/add/${user_id}`
      );

      const { status, message } = response.data;

      if (!status) throw new Error();

      toast.success(message, toast_sucess_option);
      refetchUserData();
    } catch (error) {
      toast.error("Error sending the friend request", toast_error_option);
    }
  };

  const onDeleteFriend = async () => {
    try {
      const response = await axiosInstance.patch(
        `${APP_BASE_URL}/user/friend/reject/${user_id}`
      );

      const { status, message } = response.data;

      if (!status) throw new Error();

      toast.success(message, toast_sucess_option);
      refetchUserData();
    } catch (error) {
      toast.error("Error sending the friend request", toast_error_option);
    }
  };

  return (
    <div className="flex items-center gap-[20px]" role="header">
      <PictureModal
        isLoading={isLoading}
        setFile={setFile}
        title="Update profile picture"
        submitPhoto={onImageSubmit}
        refresh={refetchUserData}
        open={open}
        onCloseModal={onCloseModal}
        storyRef={storyRef}
        image={image}
        clearImage={clearImage}
        setImage={setImage}
      />

      <Gallery>
        <Item
          original={user?.img ? user?.img : "/icons/icon-user.svg"}
          thumbnail={user?.img ? user?.img : "/icons/icon-user.svg"}
          width="400"
          height="550"
        >
          {({ ref, open }) => (
            <div className="relative">
              <Image
                ref={ref}
                onClick={open}
                src={user?.img ? user?.img : "/icons/icon-user.svg"}
                width={60}
                height={60}
                alt={`user`}
                className="rounded-full h-[60px] object-cover border-primary-45"
              />
              {isAuthUser && (
                <button
                  onClick={onOpenmodal}
                  className="scale_on_hover absolute right-0 bottom-0 flex-center rounded-full focus-visible-primary-45 p-[12px] bg-neutral-90 translate-x-[10px] translate-y-[10px]"
                >
                  <Image
                    src="/icons/icon-edit.svg"
                    className=""
                    alt="icon-edit"
                    width={16}
                    height={16}
                  />
                </button>
              )}
            </div>
          )}
        </Item>
      </Gallery>

      <h2 className="text-[24px] font-bold color-primary-60">{user?.name}</h2>

      {user.isFriend === false && user.isFriendRequestPending === false && (
        <button
          onClick={onFriendRequestSent}
          className="primary-btn ml-auto max-w-[92px] w-full h-[32px] text-[14px] font-bold"
        >
          Add Friend
        </button>
      )}
      {user.isFriend === true && user.isFriendRequestPending === false && (
        <button
          onClick={onDeleteFriend}
          className="secondary-btn ml-auto max-w-[92px] w-full h-[32px] text-[14px] font-bold"
        >
          Unfriend
        </button>
      )}
      {user.isFriend === false && user.isFriendRequestPending === true && (
        <button
          onClick={onDeleteFriend}
          className="secondary-btn ml-auto max-w-[92px] w-full h-[32px] text-[14px] font-bold"
        >
          Unsent
        </button>
      )}
    </div>
  );
};

export default UserProfileheader;
