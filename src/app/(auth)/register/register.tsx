"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import toast, { Toaster } from 'react-hot-toast';
import { register_schema } from '@/utils/validation';

import styles from './register.module.scss';
import { toast_duration, toast_error_option, toast_sucess_option } from '@/utils/toast';

interface IError {
    for: string | number,
    message: string
}

export default function RegisterForm() {
    const [form_obj, set_form_obj] = useState({ name: '', email: '', password: '' })
    const [form_error, set_form_error] = useState<IError[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        set_form_obj((prev_form_obj) => ({ ...prev_form_obj, [e.target.name]: e.target.value }));
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = register_schema.safeParse(form_obj);

            if (!response.success) {
                let errArr: IError[] = [];

                const { errors: err } = response.error;
                for (var i = 0; i < err.length; i++) {
                    errArr.push({ for: err[i].path[0], message: err[i].message });
                }

                set_form_error(errArr)
                throw err
            }
        } catch (error) {
            const { name, email, password } = form_obj;

            if (!name || !email || !password) {
                toast.error("All fields are required", toast_error_option);
                return
            }

            let err_msg: string = "";
            form_error.map((error: IError) => {
                err_msg += error.message + "\n";
            })


            toast.error(err_msg, toast_error_option);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    success: { ...toast_sucess_option },
                    error: { ...toast_error_option },
                }}
            />
            <section className={`${styles.form_wrapper} + w-full max-w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}>
                <header className="mb-[40px]">
                    <div className="mx-auto w-fit mb-[16px]">
                        <Image src='/logo.svg' width={100} height={24} alt='logo' />
                    </div>
                    <h2 className="color-primary-10 text-center text-[18px] flex-semi-bold">Connect with the World and Share Your Story</h2>
                </header>
                <form className="px-[12px] pt-[24px] pb-[16px]" onSubmit={onSubmit}>
                    <div className="form-group mb-[28px]">
                        <label htmlFor="name" className="color-primary-10 text-[14px] block mb-[4px]">Name</label>
                        <input id="name" name="name" type="text" placeholder='John Wick'
                            onChange={handleChange}
                            className="w-full text-[16px] h-[48px] px-[12px] bg-transparent border-neutral-80 rounded-[4px] focus:outline-none"></input>
                    </div>

                    <div className="form-group mb-[28px]">
                        <label htmlFor="email" className="color-primary-10 text-[14px] block mb-[4px]">Email</label>
                        <input id="email" name="email" type="text" placeholder='example@gmail.com'
                            onChange={handleChange}
                            className="w-full text-[16px] h-[48px] px-[12px] bg-transparent border-neutral-80 rounded-[4px] focus:outline-none"></input>
                    </div>

                    <div className="form-group mb-[32px]">
                        <label htmlFor="password" className="color-primary-10 text-[14px] block mb-[4px]">Password</label>
                        <input id="password" name="password" type="text"
                            onChange={handleChange}
                            className="w-full text-[16px] h-[48px] px-[12px] bg-transparent border-neutral-80 rounded-[4px] focus:outline-none"></input>
                    </div>

                    <button type="submit" className="primary-btn mb-[32px] w-full h-[40px] text-[16px] font-bold bg-primary-50 color-primary-80 rounded-[4px]">{!isLoading ? 'Register' : 'Registering...'}</button>
                    <div className="text-end">Already have an account? <Link href="/login" className="color-primary-50 underline underline-offset-2">Login</Link></div>
                </form>
            </section>
        </>
    )
}
