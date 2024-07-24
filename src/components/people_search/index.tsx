import Image from "next/image";
import Link from "next/link";

import styles from './people_search.module.scss';

type PeopleProps = {
    people: {
        id: string,
        name: string,
        imgUrl: string,
    }
}

export const PeopleSearch: React.FC<PeopleProps> = ({ people }) => {
    return (
        <>
            <article className={`people-wrapper flex flex-col max-w-[180px] w-full border-neutral-86 bg-neutral-88 rounded-8 px-[4px] pt-[16px] pb-[12px]`}>
                <Link href={`/`} className="mx-auto block mb-[10px] rounded-full focus-visible-primary-45">
                    <Image src={people.imgUrl} width={80} height={80} alt={people.name} className={`rounded-full border-primary-60 focus-visible-neutral-70`} />
                </Link>

                <Link href={`/`} className="txt-focus"><p className={`${styles.name} text-center text-[14px] color-primary-10`}>{people.name}</p></Link>

                <button className="primary-btn w-full mt-[16px] text-[14px] font-semibold h-[30px] ">Add Friend</button>
            </article>
        </>
    )
}
