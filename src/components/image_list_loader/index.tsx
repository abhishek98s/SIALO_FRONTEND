const FeedImageLoader = () => {
    const randomPhotoArr = [1, 2, 3, 4];

    return (
        <>
            {randomPhotoArr.map((item, index) => (
                <div key={index} className="loading-bg rounded-4 border-neutral-86 max-w-[100px] w-full h-[100px]">
                </div>
            ))}
        </>
    )
};

export default FeedImageLoader;
