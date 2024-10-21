import React from "react";
import Image from "next/image";
import Link from "next/link";

type Friend_Props = {
  friend: {
    id: string | number;
    name: string;
    image: string;
  };
};

export const Friend: React.FC<Friend_Props> = ({ friend }) => {
  return (
    <Link
      href={`/profile/${friend.id}/feed`}
      className="rounded-4 block focus-visible-primary-45"
    >
      <div className="min-w-[150px] p-[12px] lg:px-[4px] lg:pt-[24px] lg:pb-[16px] bg-neutral-90 border-neutral-86 rounded-4 flex lg:flex-col items-center gap-[12px]">
        <figure className="relative rounded-full w-[40px] h-[40px] border-primary-45 object-cover">
          <Image
            className="rounded-full"
            src={friend.image}
            fill={true}
            alt="friend"
          />
        </figure>
        <div className="text-[14px] color-primary-10">{friend.name}</div>
      </div>
    </Link>
  );
};
