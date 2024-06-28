import Image from "next/image";
import Link from "next/link";

import styles from './navbar.module.scss';

export default function Navbar() {
    return (
        <nav className={`${styles.navbar} + navbar flex justify-between items-center p-[16px_12px] bg-neutral-90 shadow-soft`}>
            <div>
                <Link href="/">
                    <Image src={`/logo.svg`} alt="sialo_logo" width={80} height={19.46} />
                </Link>
            </div>

            <ul>
                <li className="icon-box-32 bg-neutral-86 rounded-full">
                    <Link href="/" className="icon-box-32">
                        <Image src='/icons/profile.svg' alt="icon-user" width={32} height={32} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}