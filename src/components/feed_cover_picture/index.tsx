import React, { useRef, useState } from "react";
import Image from "next/image";

import toast from "react-hot-toast";

import { APP_BASE_URL } from "@/utils/app";
import { IProfileUser } from "@/types/home.types.";
import { axiosInterceptor } from "@/utils/axois.config";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";

import { PictureModal } from "../picture_model";

const FeedCoverPicture: React.FC<{
  isAuthUser: boolean;
  user: IProfileUser;
  refetchUserData: () => void;
}> = ({ refetchUserData, user, isAuthUser }) => {
  const [file, setFile] = useState<File | null>(null);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string>("");
  const storyRef = useRef(null);

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
      form_data.append("sialo_cover_image", file!);

      const axiosInstace = axiosInterceptor();
      const response = await axiosInstace.patch(
        `${APP_BASE_URL}/user/coverPicture`,
        form_data
      );

      const { status } = response.data;

      if (!status) throw Error("Error posting the cover picture");
      setIsLoading(false);
      toast.success("Cover Picture Updated", toast_sucess_option);
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

  return (
    <>
      <div className="relative">
        <Image
          src={user.coverImg ? user.coverImg : `/banner.png`}
          width={900}
          height={250}
          alt={`banner`}
          className="w-full h-[200px] rounded-b-[12px] border-neutral-80 object-cover object-center"
        />
        {isAuthUser && (
          <button
            onClick={onOpenmodal}
            className="scale_on_hover absolute right-0 top-0 flex-center rounded-full focus-visible-primary-45 p-[12px] bg-neutral-90 -translate-x-[10px] translate-y-[10px]"
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

      <PictureModal
        setFile={setFile}
        title="Update cover photo"
        isLoading={isLoading}
        submitPhoto={onImageSubmit}
        refresh={refetchUserData}
        open={open}
        onCloseModal={onCloseModal}
        storyRef={storyRef}
        image={image}
        clearImage={clearImage}
        setImage={setImage}
      />
    </>
  );
};

export default FeedCoverPicture;
