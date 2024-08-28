import style from './feed_loader.module.scss';


const Loader = () => {
    return (
        <article className={`${style.feed_wrapper} border-neutral-80 px-[8px] pt-[16px] pb-[16px] bg-neutral-90 rounded-8 mb-[20px]`}>
            <header className="user-info flex items-center gap-[8px] mb-[12px]">
                <div className="bg-neutral-86 w-full max-w-[40px] h-[40px] rounded-full"></div>
                <article className="info w-full">
                    <div className="bg-neutral-86 rounded-8 max-w-[150px] w-full h-[15px] mb-[4px]"></div>
                    <div className="bg-neutral-86 rounded-8 max-w-[80px] w-full h-[15px]"></div>
                </article>

                <div className={`bg-neutral-86 ml-auto w-full max-w-[40px] h-[40px] rounded-8`}></div>
            </header>
            <div className="bg-neutral-86 h-[24px] rounded-8 mb-[16px]"></div>

            <div className="bg-neutral-86 w-full h-[300px] rounded-8 mb-[16px]"></div>

            <div className="bg-neutral-86 w-full h-[45px] rounded-8\"></div>
        </article >
    )
};

const FeedLoader = () => {
    const arr = [1, 2, 3];
    return (
        <>
            {arr.map((i, index) => (
                <Loader key={index} />
            ))}
        </>
    )
};


export default FeedLoader;
