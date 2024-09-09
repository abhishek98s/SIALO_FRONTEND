import React from 'react';

const PeopleSuggestionLoader = () => {
    const suggestion_arr = [1, 2, 3];
    return (
        <>
            {
                suggestion_arr.map((people, index) =>
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center w-full">
                            <div className="loading-bg rounded-full w-full max-w-[30px] h-[30px] mr-[12px]"></div>

                            <div className="loading-bg h-[15px] rounded-8 max-w-[120px] w-full color-primary-10"></div>
                        </div>

                        <div className="loading-bg max-w-[32px] w-full h-[32px] rounded-4"></div>
                    </li>
                )}
        </>
    )
};

export default PeopleSuggestionLoader;
