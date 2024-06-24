"use client"

import styles from './login.module.scss';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


export default function login() {
    const [is_password_shown, set_is_password_shown] = useState(false);

    function show_password() {
        return set_is_password_shown(!is_password_shown);
    }
    return (
        <section className={`${styles.form_wrapper} + w-full max-w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
            <header className="mb-[48px]">
                <h1 className="color-primary-50 text-center mb-[8px] text-[38px] font-bold tracking-[8px]">SIALO</h1>
                <h2 className="color-primary-10 text-center text-[18px] flex-semi-bold">Connect with the World and Share Your Story</h2>
            </header>
            <form className="px-[12px] pt-[24px] pb-[16px]">
                <div className="form-group mb-[16px]">
                    <label htmlFor="email" className="color-primary-10 text-[14px] block mb-[4px]">Email</label>
                    <input id="email" type="text" className="w-full h-[40px] px-[12px] bg-transparent border-neutral-80 rounded-[4px] focus:outline-none"></input>
                </div>

                <div className="form-group mb-[32px]">
                    <label htmlFor="password" className="color-primary-10 text-[14px] block mb-[4px]">Password</label>
                    <div className="relative">
                        <input id="password" type={is_password_shown ? "text" : "password"} className="w-full h-[40px] px-[12px] bg-transparent border-neutral-80 rounded-[4px] focus:outline-none"></input>
                        <figure onClick={() => show_password()} className="image-center absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer w-[40px] h-[40px]">
                            <Image className="" src={is_password_shown ? "/eye-show.svg" : "/eye-close.svg"} width="20" height="16" alt="password-toggler"></Image>
                        </figure>
                    </div>
                </div>

                <button type="submit" className="mb-[32px] w-full h-[40px] text-[16px] font-bold bg-primary-50 color-primary-80 rounded-[4px]">Log in</button>
                <div className="text-end">Don't have an account? <Link href="/register" className="color-primary-50 underline underline-offset-2">Register</Link></div>
            </form>
        </section>
    )
}