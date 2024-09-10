import React from 'react';

const UserProfileheaderLoader = () => {
    return (
        <section className="search-page max-w-[910px] w-full mx-auto">

            <div className="relative">
                <div className="loading-bg max-w-[900px] h-[250px] rounded-[12px] border-neutral-80"></div>
            </div>

            <div className="relative px-[0px] lg:px-[32px] -mt-[50px]">
                <div className={` mb-[10px] lg:mb-[20px] bg-neutral-90 border-neutral-86 rounded-[8px] px-[16px] pt-[20px]`}>
                    <div className="flex items-center gap-[20px]" role="header">

                        <div className="loading-bg h-[60px] w-[60px] rounded-full"></div>

                        <h2 className="loading-bg max-w-[150px] w-full h-[20px] rounded-8"></h2>

                        <div className="loading-bg rounded-4 ml-auto max-w-[92px] w-full h-[32px]"></div>
                    </div>

                    <div className="bg-neutral-86 h-[1px] w-full my-[20px]"></div>

                    <div className="nav-wrapper flex gap-[16px]">
                        <div className={`loading-bg relative block text-[14px] text-center w-[60px] rounded-4 h-[28px]`}></div>
                        <div className={`loading-bg relative block text-[14px] text-center w-[60px] rounded-4 h-[28px]`}></div>
                        <div className={`loading-bg relative block text-[14px] text-center w-[60px] rounded-4 h-[28px]`}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileheaderLoader;
