"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import styles from './login.module.scss';
import toast from "react-hot-toast";
import { toast_error_option } from "@/utils/toast";
import axios from "axios";
import { useAppDispatch } from "@/lib/hooks";
import { setToken, setUser } from "@/lib/features/auth.slice";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/utils/auth";

export default function Login() {
    const [is_password_shown, set_is_password_shown] = useState(false);
    const [form_obj, set_form_obj] = useState({ email: '', password: '' })

    const dispatch = useAppDispatch();
    const router = useRouter();

    function show_password() {
        return set_is_password_shown(!is_password_shown);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        set_form_obj((prev_form_obj) => ({ ...prev_form_obj, [e.target.name]: e.target.value }));
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();

            if (!form_obj.email || !form_obj.password) {
                toast.error('Email and password is required', toast_error_option)
                return;
            }

            const response = await axios.post('/api/auth/', form_obj)

            if (!response.data) {
                throw new Error();
            }

            const token = response.data.token;
            dispatch(setToken(token))

            const user = decodeToken(token)
            const { username, id, email } = user;

            dispatch(setUser({ username, id, email }))

            router.push('/')
        } catch (error) {
            toast.error('Invalid Credentials', toast_error_option);
        }
    }

    return (
        <section className={`${styles.form_wrapper} + w-full max-w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
            <header className="mb-[48px]">
                <div className="mx-auto w-fit mb-[16px]">
                    <Image src='/logo.svg' width={100} height={24} alt='logo' />
                </div>
                <h2 className="color-primary-10 text-center text-[18px] flex-semi-bold">Connect with the World and Share Your Story</h2>
            </header>
            <form className="px-[12px] pt-[24px] pb-[16px]" onSubmit={onSubmit}>
                <div className="form-group mb-[16px]">
                    <label htmlFor="email" className="color-primary-10 text-[14px] block mb-[4px]">Email</label>
                    <input id="email" type="text"
                        onChange={handleChange}
                        name="email"
                        className="w-full h-[40px] px-[12px] bg-transparent border-neutral-80 rounded-[4px] focus:outline-none"></input>
                </div>

                <div className="form-group mb-[32px]">
                    <label htmlFor="password" className="color-primary-10 text-[14px] block mb-[4px]">Password</label>
                    <div className="relative">
                        <input id="password" type={is_password_shown ? "text" : "password"}
                            onChange={handleChange}
                            name="password"
                            className="w-full h-[40px] px-[12px] bg-transparent border-neutral-80 rounded-[4px] focus:outline-none"></input>
                        <figure onClick={() => show_password()} className="flex-center absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer w-[40px] h-[40px]">
                            <Image className="" src={is_password_shown ? "/icons/eye-show.svg" : "/icons/eye-close.svg"} width="20" height="16" alt="password-toggler"></Image>
                        </figure>
                    </div>
                </div>

                <button type="submit" className="primary-btn mb-[32px] w-full h-[40px] text-[16px] font-bold bg-primary-50 color-primary-80 rounded-[4px] ">Log in</button>

                <div className="text-end">Don&apost have an account? <Link href="/register" className="color-primary-50 underline underline-offset-2">Register</Link></div>
            </form>
        </section>
    )
}
