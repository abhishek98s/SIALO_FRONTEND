import Image from "next/image";
import Link from "next/link";

import styles from './navbar.module.scss';

export default function Navbar() {
    return (
        <nav className={`${styles.navbar} + fixed z-10 left-0 right-0 top-0 navbar flex justify-between items-center p-[16px_12px] bg-neutral-90 shadow-soft`}>
            <div>
                <Link href="/">
                    <Image src={`/logo.svg`} alt="sialo_logo" width={0} height={0} className="max-w-[80px] w-full" />
                </Link>
            </div>

            <ul>
                <li className="icon-box-40 bg-neutral-86 rounded-full">
                    <Link href="/" className={`${styles.user_profile} icon-box-40 flex-center block rounded-full transition-4`}>
                        <Image src='/icons/profile.svg' alt="icon-user" width={0} height={0} className="rounded-full max-w-[32px] w-full"/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
} 
