import Image from "next/image";
import Link from "next/link";

import styles from './people_search.module.scss';
import { axiosInterceptor } from "@/utils/axois.config";
import { APP_BASE_URL } from "@/utils/app";
import toast from "react-hot-toast";
import { toast_error_option, toast_sucess_option } from "@/utils/toast";

type PeopleProps = {
    people: {
        _id: string,
        name: string,
        img: string,
    }
}

export const PeopleSearch: React.FC<PeopleProps> = ({ people }) => {
    const axiosInstace = axiosInterceptor();

    const onFriendRequest = async () => {
        try {
            const response = await axiosInstace.patch(`${APP_BASE_URL}/user/friend/add/${people._id}`)
            const { status, data, messasge } = response.data;

            if (!status) throw new Error();

            toast.success(messasge, toast_sucess_option);
        } catch (error) {
            toast.error('Error sending the friend request', toast_error_option);
        }
    }

    return (
        <>
            <article className={`people-wrapper flex flex-col max-w-[180px] w-full border-neutral-86 bg-neutral-88 rounded-8 px-[4px] pt-[16px] pb-[12px]`}>
                <Link href={`/`} className="mx-auto block mb-[10px] rounded-full focus-visible-primary-45">
                    <Image src={people.img ? people.img : '/icons/icon-user.svg'} width={80} height={80} alt={people.name} className={`rounded-full border-primary-60 focus-visible-neutral-70`} />
                </Link>

                <Link href={`/`} className="txt-focus"><p className={`${styles.name} text-center text-[14px] color-primary-10`}>{people.name}</p></Link>

                <button onClick={onFriendRequest} className="primary-btn w-full mt-[16px] text-[14px] font-semibold h-[30px]">Add Friend</button>
            </article>
        </>
    )
}
