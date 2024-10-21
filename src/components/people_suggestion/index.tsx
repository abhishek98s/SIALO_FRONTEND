import React from "react";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { APP_BASE_URL } from "@/utils/app";
import { axiosInterceptor } from "@/utils/axois.config";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";
import useFetchData from "@/custom_hook/fetchdata.hook";

import PeopleSuggestionLoader from "../people_suggestion_loader";

interface IPeople {
  _id: string;
  name: string;
  img: string;
  fetchPeoplList?: () => void;
}

const People: React.FC<IPeople> = ({ _id, name, img, fetchPeoplList }) => {
  const axiosInstance = axiosInterceptor();

  const sendFriendReques = async () => {
    try {
      const response = await axiosInstance.patch(
        `${APP_BASE_URL}/user/friend/add/${_id}`
      );

      const { status, message } = response.data;

      if (!status) throw new Error();

      toast.success(message, toast_sucess_option);
      fetchPeoplList!();
    } catch (error) {
      toast.error("Failed to send the request", toast_error_option);
    }
  };

  return (
    <li className="flex items-center">
      <Link
        href={`/profile/${_id}/feed`}
        className="focus-visible-primary-45 rounded-4"
      >
        <div className="flex items-center">
          <figure className="rounded-full mr-[12px]">
            <Image
              src={img ? img : "/icons/icon-user.svg"}
              alt={`user`}
              className="object-cover rounded-full border-primary-60"
              width={30}
              height={30}
            />
          </figure>

          <span className="text-[16px] color-primary-10">{name}</span>
        </div>
      </Link>

      <button
        onClick={sendFriendReques}
        className="ml-auto focus-visible-primary-45 rounded-4"
      >
        <figure className="max-w-[32px] w-full h-[32px] flex-center p-[8px]">
          <Image
            src={`/icons/icon-add.svg`}
            width={24}
            height={24}
            alt="icon-add-friend"
          ></Image>
        </figure>
      </button>
    </li>
  );
};

const PeopleSuggestion = () => {
  const {
    data: peopleList,
    loading,
    refetch,
  } = useFetchData(`${APP_BASE_URL}/user/recommendation`);

  return (
    <>
      {
        <div className="people-suggestion-wrapper hidden lg:block max-w-[250px] w-full fixed top-[80px] right-[12px] border-neutral-80 rounded-8 px-[12px] pt-[20px] pb-[8px]">
          <div className="title-wrapper heading-line h-[24px] pb-[12px] mb-[32px] font-bold text-[16px] color-primary-10">
            People you may know
          </div>

          <ul className="people-list-wrapper mb-[12px] space-y-[12px]">
            {!loading &&
              peopleList.map((people: IPeople, index: number) => (
                <People
                  fetchPeoplList={refetch}
                  key={index}
                  _id={people._id}
                  name={people.name}
                  img={people.img}
                />
              ))}

            {loading && <PeopleSuggestionLoader />}
          </ul>

          <Link
            href="/search"
            className="block txt-focus color-primary-60 text-[14px] text-center"
          >
            View more
          </Link>
        </div>
      }
    </>
  );
};

export default PeopleSuggestion;
