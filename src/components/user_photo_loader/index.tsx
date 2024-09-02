const UserPhotoLoader = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <>
            {
                arr.map((item, index) =>
                    <div key={index} className="loading-bg rounded-4 border-neutral-86 h-[150px]"></div>
                )}
        </>
    )
};

export default UserPhotoLoader;
