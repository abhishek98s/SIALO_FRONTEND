import React from "react";

const FriendLoader = () => {
  const friendArr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {friendArr.map((item, index) => (
        <div key={index} className="rounded-4 block focus-visible-primary-45">
          <div className="min-w-[150px] p-[12px] lg:px-[4px] lg:pt-[24px] lg:pb-[16px] bg-neutral-90 border-neutral-90 rounded-4 flex lg:flex-col items-center gap-[12px]">
            <figure className="loading-bg rounded-full w-[40px] h-[40px] border-neutral-86 "></figure>
            <div className="loading-bg max-w-[150px] w-full h-[10px]"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendLoader;
