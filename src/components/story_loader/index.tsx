import React from "react";

import Image from "next/image";

interface StoryLoaderPropes {
  closeModel: () => void;
  styles: any;
}

const StoryLoader: React.FC<StoryLoaderPropes> = ({ closeModel, styles }) => {
  return (
    <section className="flex-center fixed top-1/2 bottom-0 -translate-y-1/2 md:max-w-[450px] w-full min-h-[550px] h-[100%] sm:h-[95vh] border-neutral-80 bg-neutral-90 rounded-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center header p-[12px]">
        <div className="flex items-center gap-[8px] flex-1">
          <div className="loading-bg w-full max-w-[60px] h-[60px] rounded-full"></div>

          <div className="flex-grow-0 w-full">
            <div className="loading-bg max-w-[200px] mb-2 w-full h-[20px] rounded-8"></div>
            <div className="loading-bg max-w-[100px] w-full h-[20px] rounded-8"></div>
          </div>
        </div>

        <div className="loading-bg w-[40px] h-[40px] rounded-8 ml-auto mr-2"></div>
        <button
          onClick={closeModel}
          className={`${styles.icon_button} w-[40px] h-[40px] rounded-full overflow-hidden p-[12px] flex-center`}
        >
          <Image
            loading="lazy"
            src="/icons/icon-close.svg"
            alt="icon-close"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className="loading-bg h-[100%]"></div>

      <div
        className={`backdrop-blur-[4px] absolute bottom-0 left-0 right-0 text-center leading-[1.5] text-[16px] bg-black/20 rounded-8 p-[14px]`}
      >
        <div className="loading-bg max-w-[200px] w-full mx-auto h-[20px] rounded-8"></div>
      </div>
    </section>
  );
};

export default StoryLoader;
